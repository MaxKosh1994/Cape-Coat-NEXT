import React from 'react';
import styles from './InfoContainer.module.css';

export default function InfoContainer() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.colorInfo}>
        <p className={styles.infoP}>
          {' '}
          - Цвет заказа меняется в зависимости от статуса.
        </p>
        <p className={styles.infoP}>
          {' '}
          - Поля таблицы, помеченные * неизменяемы.
        </p>
        <p className={styles.infoP}> - Остальные поля изменяются по клику.</p>
        <p className={styles.infoP}>
          {' '}
          - Заказы с ярко-красным блоком являются СРОЧНЫМИ
        </p>
      </div>

      <div className={styles.colorDescBlock}>
        <div className={styles.colorBlockCont}>
          <div className={styles.colorBlock}>
            <div className={styles.blueBlock}></div>
            <p>Заказы на начальной стадии до передачи задания в производство</p>
          </div>

          <div className={styles.colorBlock}>
            <div className={styles.yellowBlock}></div>
            <p>Заказы на стадии производства</p>
          </div>

          <div className={styles.colorBlock}>
            <div className={styles.pinkBlock}></div>
            <p>Отшитые заказы на стадии внесения остаточной оплаты</p>
          </div>
        </div>

        <div className={styles.colorBlockCont}>
          <div className={styles.colorBlock}>
            <div className={styles.greenBlock}></div>
            <p>Отправленные и завершенные заказы</p>
          </div>

          <div className={styles.colorBlock}>
            <div className={styles.redBlock}></div>
            <p>Возвраты и работа с ними</p>
          </div>

          <div className={styles.colorBlock}>
            <div className={styles.urgentBlock}></div>
            <p>Срочные заказы</p>
          </div>
        </div>
      </div>
    </div>
  );
}
