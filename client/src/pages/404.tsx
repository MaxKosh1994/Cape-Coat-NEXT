import Head from 'next/head';
import styles from '../styles/404.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Cape&Coat | Страница не найдена</title>
        <meta name='title' content='Cape and Coat' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className={styles.errContainer}>
        <h3 className={styles.errMsg} style={{ zIndex: 2 }}>
          Упс! Такой страницы сейчас не существует
        </h3>
        <Image
          src={`/404.png`}
          alt='collage1'
          fill={true}
          style={{ zIndex: '0' }}
        />
        <div className={styles.errBtnContainer} style={{ zIndex: 2 }}>
          <Link href='/'>
            <button className={styles.errBtn}>Вернуться на главную</button>
          </Link>
          <Link href='/catalog'>
            <button className={styles.errBtn}>Посмотреть каталог</button>
          </Link>
        </div>
      </div>
    </>
  );
}
