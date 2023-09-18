import Image from 'next/image';
import Link from 'next/link';
import styles from './FooterComp.module.css';
import { useMediaQuery } from '@mui/material';

export default function Footer() {
  const isTablet = useMediaQuery('(min-width:637px) and (max-width:1100px)');

  return (
    <footer>
      {isTablet ? (
        <div className={styles.footerContainer}>
          <div className={styles.footerSection}>
            <div className={styles.logoContainer}>
              <Image
                src="/logo.png"
                alt="Logo"
                layout="responsive"
                width={300}
                height={40}
              />
            </div>
          </div>
          <div className={styles.footerSection}>
            <div className={styles.footerTitle}>Наш шоурум:</div>
            <div className={styles.footerItem}>
              <Link href="/address">г.Нижний Новгород, ул. Ильинская, 79</Link>
            </div>
          </div>
          <div className={styles.footerSection}>
            <div className={styles.footerTitle}>
              <Image src="/phoneicon.png" width={28} height={28} alt="call" />{' '}
              +7 (920)-119-99-19
            </div>
            <div className={styles.footerItem}>
              <Link href="https://t.me/@kkireva">
                <Image
                  src="/tgicon.png"
                  alt="telegram @kkireva"
                  width={33}
                  height={33}
                />
              </Link>
              <Link href="https://www.pinterest.com/capencoat/">
                <Image
                  src="/pinterest-icon.png"
                  alt="pinterest @capencoat"
                  width={33}
                  height={33}
                />
              </Link>
              <Link href="mailto:Cape.n.coat@gmail.com">
                <Image
                  src="/mail.png"
                  alt="Cape.n.coat@gmail.com"
                  width={31}
                  height={31}
                />
              </Link>
            </div>
          </div>

          <div className={styles.footerSection}>
            <div className={styles.footerTitle}>Покупателям:</div>
            <div className={styles.footerItem}>
              <Link href="/FAQ">Информация о снятии мерок</Link>
            </div>
            <div className={styles.footerItem}>
              <Link href="/privacy">Политика конфиденциальности</Link>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.footerContainer}>
          <div className={styles.footerSection}>
            <div className={styles.logoContainer}>
              <Image
                src="/logo.png"
                alt="Logo"
                width={500}
                height={120}
                layout="responsive"
              />
            </div>
          </div>
          <div className={styles.footerSection}>
            <div className={styles.footerTitle}>Наш шоурум:</div>
            <div className={styles.footerItem}>
              <Link href="/address">г.Нижний Новгород, ул. Ильинская, 79</Link>
            </div>
          </div>
          <div className={styles.footerSection}>
            <div className={styles.footerTitle}>Покупателям:</div>
            <div className={styles.footerItem}>
              <Link href="/FAQ/measurementsFAQ">Информация о снятии мерок</Link>
            </div>
            <div className={styles.footerItem}>
              <Link href="/privacy">Политика конфиденциальности</Link>
            </div>
          </div>
          <div className={styles.footerSection}>
            <div className={styles.footerTitle}>
              <Image src="/phoneicon.png" width={28} height={28} alt="call" />{' '}
              +7 (920)-119-99-19
            </div>
            <div className={styles.footerItem}>
              <Link href="https://t.me/@kkireva">
                <Image
                  src="/tgicon.png"
                  alt="telegram @kkireva"
                  width={33}
                  height={33}
                />
              </Link>
              <Link href="https://www.pinterest.com/capencoat/">
                <Image
                  src="/pinterest-icon.png"
                  alt="pinterest @capencoat"
                  width={33}
                  height={33}
                />
              </Link>
              <Link href="mailto:Cape.n.coat@gmail.com">
                <Image
                  src="/mail.png"
                  alt="Cape.n.coat@gmail.com"
                  width={31}
                  height={31}
                />
              </Link>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
