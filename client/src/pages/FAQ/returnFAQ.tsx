import NavFAQComp from '@/components/navFAQComp/NavFAQComp';
import { Typography } from '@mui/material';
import React from 'react';
import styles from '../../styles/returnFAQ.module.css';

export default function returnFAQ() {
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
