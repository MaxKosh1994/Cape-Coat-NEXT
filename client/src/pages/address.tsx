import { Typography } from '@mui/material';
import styles from '../styles/Address.module.css';
import dynamic from 'next/dynamic';

const DynamicMap = dynamic(() => import('@/components/About/Map'), {
  ssr: false,
});

const Address = () => {
  return (
    <>
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
