import { Typography } from '@mui/material';
import styles from '../styles/Faq.module.css';
import Head from 'next/head';

export default function FAQ() {
  return (
    <>
      <Head>
        <title>Cape&Coat | FAQ</title>
        <meta name="title" content="Cape and Coat" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.mainDiv}>
        <div>
          <div className={styles.RootContainer}>
            <div className={styles.OuterContainer}>
              <div className={styles.Container}>
                <Typography
                  className={styles.Header}
                  variant="h3"
                  component="h1"
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
                      src="https://www.youtube.com/embed/sq00YuoHGHY"
                      title="Видео"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
                <Typography
                  className={styles.Header}
                  variant="h3"
                  component="h1"
                >
                  Обмен и возврат
                </Typography>
                <div style={{ textAlign: 'justify' }}>
                  <div className={styles.Info}>
                    1. Изделия с индивидуальными свойства требуют предоплату.
                  </div>
                  <div className={styles.Info}>
                    2. Оттенки итогового изделия могут не полностью
                    соответствовать оттенкам, отображаемым на экране вашего
                    устройства. Это особенность каждого отдельного смартфона в
                    зависимости от настроек экрана.
                  </div>
                  <div className={styles.Info}>
                    3. Возврат изделия, выполненного по индивидуальному заказу,
                    невозможен.
                  </div>
                  <div className={styles.Info}>
                    Индивидуальный заказ — приобретение товара, который выполнен
                    по размерам, дизайну покупателя, имеет индивидуальное
                    сочетание материалов, модифицирован по желанию клиента.
                    Покупатель не вправе отказаться от товара надлежащего
                    качества, имеющего индивидуально-определенные свойства, если
                    указанный товар может быть использован исключительно
                    приобретающим его потребителем.
                  </div>
                  <div className={styles.Info}>
                    Основание — п. 21 «Правил продажи товаров дистанционным
                    способом», утв. Постановлением Правительства РФ от
                    27.09.2007г. № 612, п. 4 ст. 26.1 Закона РФ от 07.02.1992г.
                    № 2300-1 «О защите прав потребителей».
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
