import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import styles from './Orders.module.css';
import { IOrder } from './types';
import { fetchOrderData } from './FetchOrderData';
import ModalItemsInOrder from '../modalItemOrders/ModalItemsInOrder';

export default function Orders() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [infoRes, setInfoRes] = useState<string>('');
  const [openOrderId, setOpenOrderId] = useState<number | null>(null);

  useEffect(() => {
    const getData = async () => {
      const { info, orders } = await fetchOrderData();
      setInfoRes(info);
      setOrders(orders);
    };

    getData();
  }, []);

  const handleOrderClick = (orderId: number) => {
    setOpenOrderId(orderId);
  };

  return (
    <div className={styles.mainDiv}>
      {infoRes?.length > 0 && <p>{infoRes}</p>}
      {orders?.length > 0 ? (
        <>
          <div className={styles.headerDiv}>
            <p>Нажмите на заказ, чтобы посмотреть подробную информацию</p>
          </div>
          <TableContainer
            className={styles.TableContainer}
            sx={{ width: '50%' }}
            component={Paper}
          >
            <Table aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontSize: 'medium' }}>№</TableCell>
                  <TableCell sx={{ fontSize: 'medium' }}>Дата</TableCell>
                  <TableCell sx={{ fontSize: 'medium' }}>Стоимость</TableCell>
                  <TableCell sx={{ fontSize: 'medium' }}>Статус</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders?.map((order) => (
                  <TableRow
                    key={order.id}
                    onClick={() => handleOrderClick(order.id)}
                  >
                    <TableCell>{order.id}</TableCell>
                    <TableCell>
                      {order.createdAt
                        .toString()
                        .slice(0, 10)
                        .replace(/-/g, '.')}
                    </TableCell>
                    <TableCell>{order.total.toLocaleString()}</TableCell>
                    <TableCell>{order.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {openOrderId !== null && (
            <ModalItemsInOrder
              open={true}
              setOpen={() => setOpenOrderId(null)}
              itemsInOrder={
                orders.find((order) => order.id === openOrderId)?.Items || []
              }
            />
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
