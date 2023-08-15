import TelegramIcon from '@mui/icons-material/Telegram';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import styles from './Social.module.css';

import React from 'react';

export default function Social() {
  return (
    <>
      <div className={styles.messengersContainer}>
        <a href="https://t.me/@kkireva">
          <TelegramIcon />
        </a>
        <a href="mailto:Cape.n.coat@gmail.com">
          <MailOutlineIcon />
        </a>
      </div>
    </>
  );
}
