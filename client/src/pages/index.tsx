import Head from 'next/head';
import styles from '../styles/Home.module.css';
import HorizontalBlock from '@/components/main/HorizontalBlock';
import VerticalBlock from '@/components/main/VerticalBlock';
import BottomBlock from '@/components/main/BottomBlock';

const Home = () => {
  return (
    <>
      <Head>
        <title>Cape&Coat | Главная</title>
        <meta name="title" content="Cape and Coat" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://fonts.googleapis.com/css2?family=Ysabeau+Infant&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <HorizontalBlock blockName="bestsellers" imgName="dresses.jpg" />
        <HorizontalBlock blockName="sale" imgName="trenches.jpg" />
        <div className={styles.blocksContainer}>
          <VerticalBlock
            blockName="Коллекция Aw-2023"
            imgUrl={`${process.env.NEXT_PUBLIC_COLLECTION_URL}IMG_8836.JPG`}
            url="collection"
          />
          <VerticalBlock
            blockName="Новые поступления"
            imgUrl={`${process.env.NEXT_PUBLIC_CATEGORY_URL}coats.jpg`}
            url="new-arrivals"
          />
        </div>
        <BottomBlock />
      </main>
    </>
  );
};

export default Home;
