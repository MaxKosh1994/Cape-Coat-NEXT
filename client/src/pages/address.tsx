import { Typography } from '@mui/material';
import styles from '../styles/Address.module.css';
import dynamic from 'next/dynamic';
import Head from 'next/head';

const DynamicMap = dynamic(() => import('@/components/About/Map'), {
  ssr: false,
});

const Address = () => {
  return (
    <>
      <Head>
        <title>Cape&Coat | Наш шоурум</title>
        <meta name="title" content="Cape and Coat" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Typography className={styles.header} variant="h3" align="center">
        <strong>Адрес шоурума</strong>
      </Typography>
      <Typography className={styles.infoText} variant="p">
        Наш адрес: Россия, г.Нижний Новгород, ул. Малая Покровская, 20
      </Typography>
      <Typography className={styles.infoText} variant="p">
        Ждем вас в будние дни с 10 утра до 20 вечера
      </Typography>
      <div className={styles.mapContainer}>
        <DynamicMap />
      </div>
    </>
  );
};
export default Address;
