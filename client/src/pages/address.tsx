import { Typography } from '@mui/material';
import styles from '../styles/Address.module.css';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import TelegramIcon from '@mui/icons-material/Telegram';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';

const DynamicMap = dynamic(() => import('@/components/About/Map'), {
  ssr: false,
});

const Address = () => {
  return (
    <>
      <Head>
        <title>Cape&Coat | Наш шоурум</title>
        <meta name='title' content='Cape and Coat' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className={styles.mainContainer}>
        <div className={styles.mapContainer}>
          <DynamicMap />
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.addressContainer}>
            <Typography className={styles.header} variant='h3' align='center'>
              <strong>Адрес шоурума</strong>
            </Typography>
            <Typography className={styles.infoText} variant='p'>
              Наш адрес: Россия, г.Нижний Новгород, ул. Малая Покровская, 20
            </Typography>
            <Typography className={styles.infoText} variant='p'>
              Ждем вас в будние дни с 10 утра до 20 вечера!
            </Typography>
          </div>

          <div className={styles.contactContainer}>
            <Typography className={styles.header} variant='h3' align='center'>
              <strong>Наши контакты</strong>
            </Typography>
            <Typography className={styles.infoText} variant='p'>
              <a
                href='mailto:Cape.n.coat@gmail.com'
                className={styles.contactLink}
              >
                <MailOutlineIcon className={styles.Icon} /> Email:
                Cape.n.coat@gmail.com
              </a>
            </Typography>
            <Typography className={styles.infoText} variant='p'>
              <a href='https://t.me/@kkireva' className={styles.contactLink}>
                <TelegramIcon className={styles.Icon} /> Telegram: @kkireva
              </a>
            </Typography>
            <Typography className={styles.infoText} variant='p'>
              <a href='tel:+79201199919' className={styles.contactLink}>
                <PhoneIcon className={styles.Icon} /> Phone number:
                +7(920)-119-99-19
              </a>
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
};
export default Address;
