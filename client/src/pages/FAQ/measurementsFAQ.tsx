import { Typography } from '@mui/material';
import React from 'react';
import styles from '../../styles/measurementsFAQ.module.css';
import NavFAQComp from '@/components/navFAQComp/NavFAQComp';

export default function measurementsFAQ() {
  return (
    <>
      <NavFAQComp />

      <div className={styles.mainContainer}>
        <div className={styles.headerContainer}>
          <Typography className={styles.Header} variant="h4" component="h1">
            Снятие мерок
          </Typography>
        </div>
        <div className={styles.mainInfoContainer}>
          <div className={styles.infoContainer}>
            <div className={styles.info}>
              Для снятия мерок воспользуйтесь портновским сантиметром. Во время
              измерения лента должна быть параллельна полу. Будте максимально
              расслаблены. Не вдыхайте глубоко, не утягивайте сантиметр, не
              давайте никаких прибавок на облегание.
            </div>

            <div className={styles.info}>
              Снимать мерки необходимо на белье или плотно прилегающую одежду
              (например - колготки и топ)
            </div>

            <div className={styles.info}>
              Обьемы груди, бедер и обхват ноги нужно снимать по самой
              выступающей части.
            </div>

            <div className={styles.info}>
              Обьемы груди, бедер и обхват ноги нужно снимать по самой
              выступающей части. Обхват талии по самому узкому месту.
            </div>

            <div className={styles.info}>
              Длину жакетов и верхней одежды необходимо измерить от верхней
              точки плечевого шва. Длину рукава так же необходимо измерить от
              верхней точки плечевого шва, с учетом длины плеча, до основания
              большого пальца. Длину юбок и брюк необходимо измерять от талии.
            </div>

            <div className={styles.info}>
              Для более точного снятия мерок предпочтительно воспользоваться
              посторонней помощью или обратиться в ателье.
            </div>
          </div>
          <div className={styles.movieContainer}>
            <video width="300" height="600" controls>
              <source src="/measurements.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        <table>
          <caption className={styles.tableCaption}>
            Оптимальные мерки по росту
          </caption>
          <thead>
            <tr className={styles.sizeTableCol}>
              <th className={styles.sizeTableHead}>Длина рукава</th>
              <th className={styles.sizeTableHead}>Длина до середины голени</th>
              <th className={styles.sizeTableHead}>
                Длина брюк от талии до пола
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className={styles.sizeTableCol}>
              <td className={styles.sizeTableEntry}>
                68-72см на рост 150-160см
              </td>
              <td className={styles.sizeTableEntry}>
                110-115см на рост 150-160см
              </td>
              <td className={styles.sizeTableEntry}>
                100-104см на рост 150-160см
              </td>
            </tr>
            <tr className={styles.sizeTableCol}>
              <td className={styles.sizeTableEntry}>
                72-74см на рост 160-165см
              </td>
              <td className={styles.sizeTableEntry}>
                115-120см на рост 160-165см
              </td>
              <td className={styles.sizeTableEntry}>
                104-108см на рост 160-165см
              </td>
            </tr>
            <tr className={styles.sizeTableCol}>
              <td className={styles.sizeTableEntry}>
                74-76см на рост 165-170см
              </td>
              <td className={styles.sizeTableEntry}>
                120-125см на рост 165-170см
              </td>
              <td className={styles.sizeTableEntry}>
                106-110см на рост 165-170см
              </td>
            </tr>
            <tr className={styles.sizeTableCol}>
              <td className={styles.sizeTableEntry}>
                76-78см на рост 170-177см
              </td>
              <td className={styles.sizeTableEntry}>
                125-130см на рост 170-177см
              </td>
              <td className={styles.sizeTableEntry}>
                110-114см на рост 170-177см
              </td>
            </tr>
            <tr className={styles.sizeTableCol}>
              <td className={styles.sizeTableEntry}>
                78-82см и больше на рост 180см
              </td>
              <td className={styles.sizeTableEntry}>
                130-135см и больше на рост 180см
              </td>
              <td className={styles.sizeTableEntry}>
                115см и больше на рост 180см
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
