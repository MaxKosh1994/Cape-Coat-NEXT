import React from 'react';
import { IOrderCompProps } from './types';
import styles from './OrderComp.module.css';
import SearchItemCard from '@/components/SearchItemCard/SearchItemCard';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ContentCutIcon from '@mui/icons-material/ContentCut';

export default function OrderComp({ order }: IOrderCompProps) {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.headerContainer}>
        <div className={styles.leftSideContainer}>
          <h4>Номер заказа: {order.id}</h4>
        </div>
        <div className={styles.rightSideContainer}>
          <h4>
            {order.status === 'Заказ создан' ||
            order.status ===
              'Уточнение мерок, отправка реквизитов для внесения предоплаты' ? (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <BookmarkBorderIcon
                  sx={{
                    width: '18px',
                    height: '18px',
                  }}
                />
                <span style={{ marginLeft: '10px' }}>Заказ создан</span>
              </div>
            ) : order.status === 'Ожидание предоплаты' ? (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <AccessTimeIcon
                  sx={{
                    width: '18px',
                    height: '18px',
                  }}
                />
                <span style={{ marginLeft: '10px' }}>Ожидаем предоплаты</span>
              </div>
            ) : order.status === 'Предоплата получена' ||
              order.status === 'Задание передано на производство' ||
              order.status === 'Обратная связь по заданию от производства' ||
              order.status === 'Изделия в производстве' ||
              order.status === 'Изделие отшито' ||
              order.status === 'Забрали заказ с производства' ? (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <ContentCutIcon
                  sx={{
                    width: '18px',
                    height: '18px',
                  }}
                />
                <span style={{ marginLeft: '10px' }}>Заказ отшивается</span>
              </div>
            ) : order.status ===
              'Оповещение клиента, отправка реквизитов для внесения полной оплаты' ? (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <AccessTimeIcon
                  sx={{
                    width: '18px',
                    height: '18px',
                  }}
                />
                <span style={{ marginLeft: '10px' }}>
                  Ожидаем полной оплаты
                </span>
              </div>
            ) : order.status === 'Получена полная оплата' ||
              order.status === 'Заказ отправлен' ? (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <CheckCircleIcon
                  sx={{
                    color: 'green',
                    width: '18px',
                    height: '18px',
                  }}
                />
                <span style={{ marginLeft: '10px' }}>
                  Заказ отшит, оплачен и отправлен
                </span>
              </div>
            ) : order.status === 'Возврат заказа' ||
              order.status === 'Перешив заказа' ? (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <ContentCutIcon
                  sx={{
                    width: '18px',
                    height: '18px',
                  }}
                />
                <span style={{ marginLeft: '10px' }}>Доработка заказа</span>
              </div>
            ) : (
              ''
            )}
          </h4>
        </div>
      </div>

      <div className={styles.bodyContainer}>
        <div className={styles.leftBodyContainer}>
          <div className={styles.headerComp}>
            <h4>
              <span className={styles.boldDarkText}>Дата: </span>
              {`  ${order.createdAt
                .toString()
                .slice(0, 10)
                .replace(/-/g, '.')}`}
            </h4>
          </div>

          <div className={styles.headerComp}>
            <h4>
              <span className={styles.boldDarkText}>Сумма заказа: </span>{' '}
              {order.total.toLocaleString().replace(/,\s?/g, ' ')} ₽
            </h4>
          </div>

          <div className={styles.headerComp}>
            <h4>
              <span className={styles.boldDarkText}>Адрес: </span>{' '}
              {order.address}
            </h4>
          </div>
        </div>
        <div
          className={
            order.Items.length > 1
              ? `${styles.rightBodyContainer} ${styles.wide}`
              : `${styles.rightBodyContainer} ${styles.narrow}`
          }
        >
         {/* // TODO перекрещиваются типы, исправить 
         */}
           {order.Items?.map((item) => (
            <SearchItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      <div className={styles.footerContainer}>
        <h4>Комментарии: {order.comments}</h4>
      </div>
    </div>
  );
}
