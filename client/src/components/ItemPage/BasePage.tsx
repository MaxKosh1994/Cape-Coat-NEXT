import Head from 'next/head';
import styles from '../../styles/BasePage.module.css';
import ProductCard from '@/components/ProductCard/ProductCard';
import { IBasePageItem } from '../../TypeScript/basePageTypes';
import { Item } from '@/app/itemSlice';

export default function BasePage({
  pageName,
  itemsArr,
}: {
  pageName: string;
  itemsArr: IBasePageItem[];
}) {
  return (
    <>
      <Head>
        <title>Cape&Coat | {pageName}</title>
        <meta name="title" content="Cape and Coat" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="title"
          content="Cape and Coat - Индивидуальная одежда на заказ"
        />
        <meta
          name="keywords"
          content="пошив одежды, пошив одежды рядом, на заказ, Cape&Coat, одежда по меркам, женская одежда на заказ, пошив на заказ для женщин, пошив платья, пошив платья на заказ, пошив пальто, пошив женских пальто, пошив костюма, пошив костюма на заказ, пошив женских костюмов, пошив брюк женских, пошив брюк, пошив юбок, пошив на заказ, пошив тренча, пошив шуб, пошив шуб на заказ, пошив искусственных шуб, индивидуальный пошив шубы, пошив женского пиджака, пошив пиджака, пошив одежды цена"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.pageContainer}>
        <h3 className={styles.header}>{pageName}</h3>
        <div className={styles.cardsContainer}>
          {itemsArr.map((item) => (
            <ProductCard
              key={item.id}
              material_name={item.Material.name}
              id={item.id}
              article={item.article}
              photo={item?.photo || item?.Photos[0]?.photo}
              name={item.name}
              price={item.price}
              isFavorite={item.isFavorite}
              isCart={item.isCart}
              newPrice={item.new_price}
            />
          ))}
        </div>
      </div>
    </>
  );
}
