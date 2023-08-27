import React, { useEffect, useState } from 'react';
import styles from './Profile.module.css';
import { Button } from '@mui/material';
import ModalEditInfo from '../modalEditInfo/ModalEditInfo';
import { IUserInfo } from './UserDataTypes';
import fetchUserInfo from './FetchUserInfo';

export default function Profile() {
  const [open, setOpen] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<IUserInfo | undefined>(undefined);

  useEffect(() => {
    const response = fetchUserInfo();
    response.then((data) => {
      if (data && Object.keys(data).length > 0) {
        setUserInfo(data);
      }
    });
  }, []);

  const handleOpen = () => setOpen(true);

  return (
    <div className={styles.mainDiv}>
      <div className={styles.mainContainer}>
        <div className={styles.container}>
          <div className={styles.liContainer}>
            <h5 className={styles.headerFive}>Электронная почта</h5>
            <div className={styles.pContainer}>
              <p className={styles.pFive}>{userInfo?.email}</p>
            </div>
          </div>
          <div className={styles.liContainer}>
            <h5 className={styles.headerFive}>ФИО</h5>
            <p className={styles.pFive}>{userInfo?.full_name}</p>
          </div>
          <div className={styles.liContainer}>
            <h5 className={styles.headerFive}>Адрес</h5>
            <div className={styles.pContainer}>
              <p className={styles.pFive}>{userInfo?.address}</p>
            </div>
          </div>
          <div className={styles.liContainer}>
            <h5 className={styles.headerFive}>Номер телефона</h5>
            <div className={styles.pContainer}>
              <p className={styles.pFive}>{userInfo?.phone}</p>
            </div>
          </div>
          <div className={styles.liContainer}>
            <h5 className={styles.headerFive}>Ваш Telegram/Instagram</h5>
            <div className={styles.pContainer}>
              <p className={styles.pFive}>{userInfo?.telegram_instagram}</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.containerButton}>
        <Button
          className={styles.button}
          onClick={handleOpen}
          variant='contained'
          color='primary'
          type='submit'
          style={{
            backgroundColor: 'black',
            color: 'white',
          }}
        >
          Редактировать
        </Button>
      </div>
      <ModalEditInfo
        open={open}
        setOpen={setOpen}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
      />
    </div>
  );
}
