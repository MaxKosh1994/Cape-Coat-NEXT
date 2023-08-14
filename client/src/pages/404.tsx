import styles from '../styles/404.module.css';
import Link from 'next/link';

export default function Custom404() {
  return (
    <div className={styles.errContainer}>
      <h3 className={styles.errMsg}>
        Упс! Такой страницы сейчас не существует
      </h3>
      <div className={styles.errBtnContainer}>
        <Link href='/'>
          <button className={styles.errBtn}>Вернуться на главную</button>
        </Link>
        <Link href='/catalog'>
          <button className={styles.errBtn}>Посмотреть каталог</button>
        </Link>
      </div>
    </div>
  );
}
