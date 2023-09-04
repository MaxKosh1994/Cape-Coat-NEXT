import Head from 'next/head';
import styles from '../../styles/BasePage.module.css';
import ProductCard from '@/components/ProductCard/ProductCard';

export default function BasePage({ pageName, itemsArr }) {
  console.log(itemsArr);
  return (
    <>
      <Head>
        <title>Cape&Coat | {pageName}</title>
        <meta name="title" content="Cape and Coat" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.pageContainer}>
        <h3 className={styles.header}>{pageName}</h3>
        <div className={styles.cardsContainer}>
          {itemsArr.map((item) => (
            <ProductCard
              key={item.id}
              material_name={item.material_name}
              id={item.id}
              article={item.article}
              photo={item?.photo || item?.Photos[0]?.photo}
              name={item.name}
              price={item.price}
              isFavorite={false}
              isCart={false}
              newPrice={item.new_price}
            />
          ))}
        </div>
      </div>
    </>
  );
}
