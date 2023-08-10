import { GetServerSideProps, GetStaticProps } from 'next';
import { Typography } from '@mui/material';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Link from 'next/link';

import dynamic from 'next/dynamic';

const DynamicMap = dynamic(() => import('@/components/About/Map'), {
  ssr: false,
});

const Home = () => {
  return (
    <>
      <Head>
        <title>Cape&Coat | Main</title>
        <meta name="title" content="Cape and Coat" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://fonts.googleapis.com/css2?family=Ysabeau+Infant&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="main-container">
          <div className={styles.vidContainer}>
            <video autoPlay loop muted className={styles.vid}>
              <source src="/IMG_6623.mp4" type="video/mp4" />
            </video>
          </div>

          <div className={styles.stockContainer}>
            <Typography
              style={{ textAlign: 'center' }}
              variant="h1"
              component="h1"
            >
              SALE
            </Typography>
          </div>
          <div className={styles.blocksContainer}>
            <div className={styles.collectionContainerMain}>
              <Link href="/catalog/collection" className={styles.mainLink}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_COLLECTION_URL}IMG_8836.JPG`}
                  alt=""
                  fill={true}
                  className={styles.imageMain}
                />
                <Typography>
                  <span className={styles.textImgMain}>Коллекция AW-2023</span>
                </Typography>
              </Link>
            </div>
            <div className={styles.latestContainer}>
              <Link href="/catalog/new-arrivals" className={styles.mainLink}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_CATEGORY_URL}coats.jpg`}
                  alt=""
                  fill={true}
                  className={styles.imageMain}
                />
                <Typography>
                  <span className={styles.textImgMain}>Новые модели</span>
                </Typography>
              </Link>
            </div>
          </div>
          <div className={styles.catalogNav}>
            <Link href="/catalog" className={styles.mainLink}>
              <Image
                src="/cat-main.jpg"
                alt=""
                fill={true}
                className={styles.imgToCat}
              />
              <Typography>
                <span className={styles.catalogNavText}>Перейти в каталог</span>
              </Typography>
            </Link>
          </div>
        </div>
        <DynamicMap />
      </main>
    </>
  );
};

export default Home;
