import React, { useEffect, useState } from 'react';

import './itemStyle.css';

import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/app/hooks';

import {
  fetchFavouritesData,
  fetchItemData,
} from '@/app/thunkActionsFavourite';

import { checkCartItemThunk } from '@/app/thunkActionsCart';

import { RootState } from '@/app/store';
import { useRouter } from 'next/router';
import ItemLeftPart from '@/components/ItemLeftPart/ItemLeftPart';
import ItemRightPart from '@/components/ItemRightPart/ItemRightPart';

import Head from 'next/head';
import BasePage from '@/components/ItemPage/BasePage';
import useMediaQuery from '@mui/material/useMediaQuery';
import { getItems } from './fetchItemData';
import { Item } from '@/app/itemSlice';

export default function Item() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  const dispatch = useAppDispatch();

  const router = useRouter();
  const { item } = router.query;
  const itemId: number = Number(item);

  const itemData = useSelector((state: RootState) => state.itemSlice.item);

  useEffect(() => {
    if (itemId) {
      dispatch(fetchItemData(itemId));
      dispatch(fetchFavouritesData());
      dispatch(checkCartItemThunk());
    }
  }, [dispatch, itemId]);

  const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL;

  const imageData = itemData?.Photos?.map((photo, index) => ({
    id: index + 1,
    url: `${imageUrl}${photo.photo}`,
  }));

  const [similarItems, setSimilarItems] = useState<Item[]>([]);

  useEffect(() => {
    getItems(setSimilarItems, isMobile, itemData);
  }, [itemData]);

  return (
    <>
      <Head>
        <title>Cape&Coat | {itemData.name}</title>
        <meta name="title" content="Cape and Coat" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="wrapper wrapper-product">
        <div>
          <div className="product">
            <div className="product__wrapper">
              <div className="left-part">
                <ItemLeftPart imageData={imageData} />
              </div>
              <div className="right-part">
                <ItemRightPart itemData={itemData} itemId={itemId} />
              </div>
            </div>
            <BasePage pageName="Похожие товары" itemsArr={similarItems} />
          </div>
        </div>
      </div>
    </>
  );
}
