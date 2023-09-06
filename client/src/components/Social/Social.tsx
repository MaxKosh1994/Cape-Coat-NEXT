import TelegramIcon from '@mui/icons-material/Telegram';
import styles from './Social.module.css';
import { Icon36LogoVk } from '@vkontakte/icons';
import React from 'react';
import { useRouter } from 'next/router';

export default function Social() {
  const router = useRouter();

  const isAdminAcc = router.asPath.includes('admin');

  return (
    <>
      {!isAdminAcc && (
        <div className={styles.messengersContainer}>
          <a className={styles.teleIcon} href="https://t.me/@kkireva">
            <TelegramIcon />
          </a>
          <a className={styles.vkIcon} href="https://vk.com/cape.n.coat">
            <Icon36LogoVk />
          </a>
        </div>
      )}
    </>
  );
}
