import { Typography } from '@mui/material';
import React from 'react';
import styles from '../../styles/measurementsFAQ.module.css';
import NavFAQComp from '@/components/navFAQComp/NavFAQComp';

export default function measurementsFAQ() {
  return (
    <>
      <NavFAQComp />
      <div className={styles.mainDiv}>
        <div>
          <div className={styles.RootContainer}>
            <div className={styles.OuterContainer}>
              <div className={styles.Container}>
                <Typography
                  className={styles.Header}
                  variant='h3'
                  component='h1'
                >
                  Снятие мерок
                </Typography>
                <div style={{ textAlign: 'justify' }}>
                  <div className={styles.Info}>
                    Для снятия мерок воспользуйтесь портновским сантиметром. Во
                    время измерения лента должна быть параллельна полу. Будте
                    максимально расслаблены. Не вдыхайте глубоко, не утягивайте
                    сантиметр, не давайте никаких прибавок на облегание.
                  </div>
                  <div className={styles.Info}>
                    Снимать мерки необходимо на белье или плотно прилегающую
                    одежду (например - колготки и топ)
                  </div>
                  <div className={styles.Info}>
                    Обьемы груди, бедер и обхват ноги нужно снимать по самой
                    выступающей части.
                  </div>
                  <div className={styles.Info}>
                    Обьемы груди, бедер и обхват ноги нужно снимать по самой
                    выступающей части. Обхват талии по самому узкому месту.
                  </div>
                  <div className={styles.Info}>
                    Длину жакетов и верхней одежды необходимо измерить от
                    верхней точки плечевого шва. Длину рукава так же необходимо
                    измерить от верхней точки плечевого шва, с учетом длины
                    плеча, до основания большого пальца. Длину юбок и брюк
                    необходимо измерять от талии.
                  </div>
                  <div className={styles.Info}>
                    Для более точного снятия мерок предпочтительно
                    воспользоваться посторонней помощью или обратиться в ателье.
                  </div>
                  <div className={styles.Movie}>
                    <iframe
                      className={styles.iframe}
                      src='https://www.youtube.com/embed/sq00YuoHGHY'
                      title='Video'
                      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
