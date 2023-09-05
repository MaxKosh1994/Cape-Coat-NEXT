import { Typography } from '@mui/material';
import styles from '../styles/Address.module.css';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import TelegramIcon from '@mui/icons-material/Telegram';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import { Icon36LogoVk } from '@vkontakte/icons';
import PinterestIcon from '@mui/icons-material/Pinterest';

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
              Наш адрес: Россия, г.Нижний Новгород, ул. Ильинская, 79
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
            <Typography className={styles.infoTextNotVk} variant='p'>
              <a href='https://t.me/@kkireva' className={styles.contactLink}>
                <TelegramIcon className={styles.Icon} /> Telegram: @kkireva
              </a>
            </Typography>
            <Typography className={styles.infoTextNotVk} variant='p'>
              <a className={styles.link} href='https://pin.it/2lozIsT'>
                <PinterestIcon className={styles.Icon} /> Pinterest: @capencoat
              </a>
            </Typography>
            <Typography className={styles.infoTextNotVk} variant='p'>
              <a className={styles.link} href='https://pin.it/AK7aIDV'>
                <PinterestIcon className={styles.Icon} /> Pinterest: @KKir_eva
              </a>
            </Typography>
            <Typography className={styles.infoTextNotVk} variant='p'>
              <a href='tel:+79201199919' className={styles.contactLink}>
                <PhoneIcon className={styles.Icon} /> Phone number:
                +7(920)-119-99-19
              </a>
            </Typography>
            <Typography className={styles.infoText} variant='p'>
              <a className={styles.link} href='https://vk.com/cape.n.coat'>
                <Icon36LogoVk className={styles.Icon} /> Группа ВК
              </a>
            </Typography>
            <Typography className={styles.infoText} variant='p'>
              <a className={styles.link} href='https://vk.com/kkireva'>
                <Icon36LogoVk className={styles.Icon} /> Группа ВК (платья)
              </a>
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
};
export default Address;
