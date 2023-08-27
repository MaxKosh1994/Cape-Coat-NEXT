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

export default function Item() {
  // const router = useRouter();
  // const { category, item } = router.query;
  const isMobile = useMediaQuery('(max-width: 768px)');

  const [isLiked, setIsLiked] = useState(false);
  const [isInCart, setIsInCart] = useState(false);

  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.sessionSlice.user);

  const router = useRouter();
  const { category, item } = router.query;

  const itemData = useSelector((state: RootState) => state.itemSlice.item);

  const cartData = useSelector((state: RootState) => state.cartSlice.cartItems);
  const materialsData = useSelector(
    (state: RootState) => state.itemSlice.materials
  );

  const favourites = useSelector(
    (state: RootState) => state.favouriteSlice.favourites
  );

  useEffect(() => {
    if (item) {
      dispatch(fetchItemData(item));
      dispatch(fetchFavouritesData());
      dispatch(checkCartItemThunk());
    }
    // dispatch(getCartItemsThunk(id))
  }, [dispatch, item]);

  useEffect(() => {
    const checkLike = favourites.some((el) => el.item_id === +item);
    setIsLiked(checkLike);
  }, [favourites, item]);

  useEffect(() => {
    const isInCart = cartData.some((el) => el.item_id === +item);
    setIsInCart(isInCart);
  }, [cartData, item]);

  const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL;
  const materialsUrl = process.env.NEXT_PUBLIC_MATERIALS_URL;
  const textileData = materialsData?.map((material) => ({
    id: material.id,
    url: `${materialsUrl}${material.photo}`,
  }));

  const imageData = itemData?.Photos?.map((photo, index) => ({
    id: index + 1,
    url: `${imageUrl}${photo.photo}`,
  }));

  const [similarItems, setSimilarItems] = useState([]);

  const getItems = async () => {
    try {
      const allItems = await fetch(
        `${process.env.NEXT_PUBLIC_URL}item/allItems`,
        {
          credentials: 'include',
        }
      );
      const response = await allItems.json();
      if (allItems.status === 200) {
        const filteredItems = response.filter(
          (item) =>
            item.category_id === itemData.category_id &&
            item.material_id !== itemData.material_id
        );

        const cutFilteredItems = isMobile
          ? filteredItems.slice(0, 2)
          : filteredItems.slice(0, 4);
        setSimilarItems(cutFilteredItems);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getItems();
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
                <ItemRightPart itemData={itemData} item={item} />
              </div>
            </div>
            <BasePage pageName="Похожие товары" itemsArr={similarItems} />
          </div>
        </div>
      </div>
    </>
  );
}
