import Head from 'next/head';
import styles from '../styles/404.module.css';
import Link from 'next/link';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Cape&Coat | Страница не найдена</title>
        <meta name="title" content="Cape and Coat" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.errContainer}>
        <h3 className={styles.errMsg}>
          Упс! Такой страницы сейчас не существует
        </h3>
        <div className={styles.errBtnContainer}>
          <Link href="/">
            <button className={styles.errBtn}>Вернуться на главную</button>
          </Link>
          <Link href="/catalog">
            <button className={styles.errBtn}>Посмотреть каталог</button>
          </Link>
        </div>
      </div>
    </>
  );
}
