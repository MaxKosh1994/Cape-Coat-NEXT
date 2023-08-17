import Image from 'next/image';
import Link from 'next/link';
import logo from './logoStore.svg';
import styles from './FooterComp.module.css';
import TelegramIcon from '@mui/icons-material/Telegram';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Phone } from '@mui/icons-material';
import { useMediaQuery } from '@mui/material';

export default function Footer() {
  const fontSize = 10;
  const isMobile = useMediaQuery('(max-width: 600px)');
  const isTablet = useMediaQuery('(min-width:600px) and (max-width:900px)');
  const isLaptop = useMediaQuery('(min-width:851px) and (max-width:1200px)');

  return (
    <footer id="footer" className={styles.footer}>
      <div className={styles.footer__navigation}>
        <div className={`${styles['footer__navigation-wrapper']}`}>
          <div className={`${styles['footer__navigation-block']}`}>
            <div className={`${styles['footer__navigation-title']}`}>
              <Image
                src={logo}
                alt="Logo"
                priority={true}
                style={{
                  width: '200px',
                  height: '30px',
                  objectFit: 'cover',
                }}
              />
            </div>
          </div>
        </div>
        <div className={`${styles['footer__navigation-wrapper']}`}>
          <div className={`${styles['footer__navigation-block']}`}>
            <div className={`${styles['footer__navigation-title']}`}>
              <div className={`${styles['footer__title']}`}>Наш шоурум:</div>
            </div>
            <div className={`${styles['footer__navigation-item']}`}>
              г.Нижний Новгород, ул. Малая Покровская, 20
            </div>
            <div className={`${styles['footer__navigation-item']}`}>
              Ждем вас с 10:00 до 20:00
            </div>
          </div>
        </div>
        <div className={`${styles['footer__navigation-wrapper']}`}>
          <div className={`${styles['footer__navigation-block']}`}>
            <div className={`${styles['footer__navigation-title']}`}>
              <div className={`${styles['footer__title']}`}>Покупателям:</div>
            </div>
            <div>
              <a
                className={`${styles['footer__navigation-item']}`}
                style={{ color: 'black' }}
                href="/FAQ"
              >
                Информация о снятии мерок
              </a>
            </div>
            <div className={`${styles['footer__navigation-item']}`}>
              <Link
                className={`${styles['footer__navigation-item']}`}
                style={{ color: 'black' }}
                href="/privacy"
              >
                Политика конфиденциальности
              </Link>
            </div>
          </div>
        </div>
        <div
          className={`${styles['footer__navigation-wrapper']} ${styles['footer__navigation-wrapper--right']}`}
        >
          <div className={`${styles['footer__navigation-block']}`}>
            <div className={`${styles['footer__navigation-title']}`}>
              <div className={`${styles['footer__title']}`}>
                <Phone sx={{ fontSize: '1rem', marginRight: '10px' }} />
                +7 (920)-119-99-19
              </div>
            </div>

            <div className={`${styles['footer__navigation-item']}`}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-evenly',
                  marginTop: '10px',
                  marginBottom: '10px',
                }}
              >
                <a style={{ color: 'black' }} href="https://t.me/@kkireva">
                  <TelegramIcon />
                </a>
                <a
                  style={{ color: 'black' }}
                  href="mailto:Cape.n.coat@gmail.com"
                >
                  <MailOutlineIcon />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
