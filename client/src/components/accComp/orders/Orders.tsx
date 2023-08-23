import React, { useEffect, useState } from 'react';
import styles from './Orders.module.css';
import { IOrder } from './types';
import { fetchOrderData } from './FetchOrderData';
import OrderComp from '../orderComp/OrderComp';

export default function Orders() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [infoRes, setInfoRes] = useState<string>('');

  useEffect(() => {
    const getData = async () => {
      const { info, orders } = await fetchOrderData();
      setInfoRes(info);
      setOrders(orders);
    };

    getData();
  }, []);

  return (
    <div className={styles.mainDiv}>
      {infoRes?.length > 0 && <p>{infoRes}</p>}
      {orders?.length > 0 ? (
        <>
          {orders?.map((order) => (
            <OrderComp key={order.id} order={order} />
          ))}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
