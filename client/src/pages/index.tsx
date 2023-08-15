import { useState, useEffect } from 'react';
import { GetServerSideProps, GetStaticProps } from 'next';
import { Typography } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import TelegramIcon from '@mui/icons-material/Telegram';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Social from '@/components/Social/Social';

const Home = () => {
  return (
    <>
      <Head>
        <title>Cape&Coat | Main</title>
        <meta name='title' content='Cape and Coat' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link
          href='https://fonts.googleapis.com/css2?family=Ysabeau+Infant&display=swap'
          rel='stylesheet'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <div className='main-container'>
          <div className={styles.bestContainer}>
            <Image
              src={`${process.env.NEXT_PUBLIC_CATEGORY_URL}dresses.jpg`}
              alt=''
              fill={true}
              className={styles.best}
            />
            <div className={styles.textImg}>
              <Typography>
                <span>BESTSELLERS</span>
                <button>
                  <Link href='/catalog/bestsellers'>ПОСМОТРЕТЬ РАЗДЕЛ</Link>
                </button>
              </Typography>
            </div>
          </div>

          <div className={styles.stockContainer}>
            <Image
              src={`${process.env.NEXT_PUBLIC_CATEGORY_URL}trenches.jpg`}
              alt=''
              fill={true}
              className={styles.best}
            />
            <div className={styles.textImg}>
              <Typography>
                <span>SALE</span>
                <button>
                  <Link href='/catalog/sale'>ПОСМОТРЕТЬ РАЗДЕЛ</Link>
                </button>
              </Typography>
            </div>
          </div>
          <div className={styles.blocksContainer}>
            <div className={styles.collectionContainerMain}>
              <Image
                src={`${process.env.NEXT_PUBLIC_COLLECTION_URL}IMG_8836.JPG`}
                alt=''
                fill={true}
                className={styles.imageMain}
              />
              <div className={styles.textImgMain}>
                <Typography>
                  <span>Коллекция AW-2023</span>
                  <button>
                    <Link href='/catalog/collection'>ПОСМОТРЕТЬ РАЗДЕЛ</Link>
                  </button>
                </Typography>
              </div>
            </div>
            <div className={styles.latestContainer}>
              <Image
                src={`${process.env.NEXT_PUBLIC_CATEGORY_URL}coats.jpg`}
                alt=''
                fill={true}
                className={styles.imageMain}
              />
              <div className={styles.textImgMain}>
                <Typography>
                  <span>Новые поступления</span>
                  <button>
                    <Link href='/catalog/new-arrivals'>ПОСМОТРЕТЬ РАЗДЕЛ</Link>
                  </button>
                </Typography>
              </div>
            </div>
          </div>
          <div className={styles.mapNav}>
            <Link href='/catalog'>
              <Image
                src='/cat-main.jpg'
                alt=''
                fill={true}
                className={styles.imgToMap}
              />
              <Typography>
                <span className={styles.mapNavText}>
                  Наш шоурум{' '}
                  <Link href='/address' className={styles.mapNavTextSmall}>
                    <PlaceIcon
                      style={{
                        color: 'red',
                        width: '1.2rem',
                        height: '1.2rem',
                      }}
                    />
                    Показать на карте
                  </Link>
                </span>
              </Typography>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
