import React from 'react';
import './itemStyle.css';
import ItemLeftPart from '@/components/ItemLeftPart/ItemLeftPart';
import ItemRightPart from '@/components/ItemRightPart/ItemRightPart';
import Head from 'next/head';
import BasePage from '@/components/ItemPage/BasePage';
import { getItems } from '../../../app/fetchItemData';
import { Item, ItemState } from '@/app/itemSlice';
import { GetServerSidePropsContext } from 'next';
import Custom404 from '@/pages/404';
interface ItemProps {
  itemData: Item;
  imageData: { id: number; url: string }[];
  itemId: number;
  materialsData: ImaterialsData[];
  similarItems: Item[];
  error: { message: string };
}
export interface ImaterialsData {
  id: number;
  name: string;
  photo: string;
  category_id: number;
}

function Item({
  itemData,
  imageData,
  itemId,
  materialsData,
  similarItems,
  error,
}: ItemProps) {
  if (error) {
    return (
      <div className="error-message">Произошла ошибка: {error.message}</div>
    );
  }

  if (!itemData) {
    return <Custom404 />;
  }

  return (
    <>
      <Head>
        <title>Cape&Coat | {`${itemData.name}`}</title>

        <meta
          name="description"
          content={`Откройте для себя ${itemData.name} на Cape&Coat, качественная одежда на все случаи жизни`}
        />
        <meta name="title" content="Cape and Coat" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        <meta
          name="keywords"
          content="одежда, на заказ, пошив, Нижний Новгород, распродажа, пошив платья, пошив платья на заказ, пошив пальто, пошив женских пальто, пошив костюма, пошив костюма на заказ, пошив женских костюмов, пошив брюк женских, пошив брюк, пошив юбок, пошив на заказ, пошив тренча, пошив шуб, пошив шуб на заказ, пошив искусственных шуб, индивидуальный пошив шубы, пошив женского пиджака, пошив пиджака, пошив одежды цена"
        />
        <meta name="author" content="Cape and coat" />
        <meta name="robots" content="index, follow" />
        <meta
          name="canonical"
          content={`https://тут написать сайт/catalog/${itemData.Category.urlName}/${itemId}`}
        />

        <meta property="og:title" content={`Cape&Coat | ${itemData.name}`} />
        <meta
          property="og:description"
          content={`Откройте для себя ${itemData.name} на Cape&Coat, качественная одежда на все случаи жизни`}
        />

        <meta
          property="og:url"
          content={`https:тут написать сайт/catalog/${itemData.Category.urlName}/${itemId}`}
        />
        <meta property="og:type" content="website" />
      </Head>
      <div className="wrapper wrapper-product">
        <div>
          <div className="product">
            <div className="product__wrapper">
              <div className="left-part">
                <ItemLeftPart imageData={imageData} />
              </div>
              <div className="right-part">
                <ItemRightPart
                  itemData={itemData}
                  itemId={itemId}
                  materialsData={materialsData}
                />
              </div>
            </div>
            <BasePage pageName="Похожие товары" itemsArr={similarItems} />
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { item: itemId } = context.query;
  const isMobileQueryParam = context.query.isMobile;
  const isMobile = isMobileQueryParam === 'true';

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}item/${itemId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    if (res.ok) {
      const data: ItemState = await res.json();

      const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL;

      const imageData = data.item.Photos.map((photo, index) => ({
        id: index + 1,
        url: `${imageUrl}${photo.photo}`,
      }));

      const similarItems = await getItems(isMobile, data.item);

      return {
        props: {
          itemData: data.item,
          imageData: imageData,
          itemId: Number(itemId),
          materialsData: data.materials,
          similarItems: similarItems,
          error: null,
        },
      };
    } else if (!res.ok) {
      return {
        props: {
          itemData: null,
        },
      };
    }
  } catch (error) {
    console.error(error);
  }
}

export default Item;
