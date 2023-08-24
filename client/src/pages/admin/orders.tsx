import { useState, useEffect } from 'react';
import {
  allOrderDataFetch,
  updateOrderCommentsFetch,
  updateOrderDataFetch,
} from '../../components/Admin/HTTP/adminApi';
import styles from '../../styles/admin/OrdersAdmin.module.css';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
import InfoModal from '../../components/Admin/InfoModal';
import NavAdminComp from '@/components/navAdminComp/NavAdminComp';
import { IOrderAdmin } from '@/components/Admin/order/types';

export default function Order() {
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState('');
  const [statusVal, setStatus] = useState({
    status: 'Заказ принят',
  });

  //! ---------------------Изменение админского коммента-------------------------------------------

  const [editingOrderId, setEditingOrderId] = useState(null);
  const [newAdminComment, setNewAdminComment] = useState('');

  const handleCommentClick = (orderId, currentAdminComment) => {
    setEditingOrderId(orderId);
    setNewAdminComment(currentAdminComment);
  };

  const handleCommentChange = (event) => {
    setNewAdminComment(event.target.value);
  };

  const handleCommentConfirm = () => {
    updateOrderCommentsFetch(editingOrderId, newAdminComment).then(
      (updatedOrder) => {
        if (updatedOrder) {
          const newOrders = orders.map((order) =>
            order.id === editingOrderId ? updatedOrder : order
          );
          setOrders(newOrders);
        }
        setEditingOrderId(null);
        setNewAdminComment('');
      }
    );
  };

  //! ----------------------------------------------------------------

  const [open, setOpen] = useState(false);

  useEffect(() => {
    allOrderDataFetch(setOrders);
  }, []);

  const changeHandler = (e) => {
    setStatus({ [e.target.name]: e.target.value });
  };

  const updateHandler = (id) => {
    const index = orders.findIndex((order) => order.id === id);
    if (index !== -1) {
      orders[index].status = statusVal.status;
    }
    setOrders([...orders]);
    updateOrderDataFetch(id, statusVal.status, setMessage);
    setOpen(true);
    setTimeout(() => {
      setMessage('');
      setOpen(false);
    }, 1000);
  };

  console.log(orders);

  return (
    <>
      <NavAdminComp />
      <div className={styles.mainDiv}>
        <TableContainer className={styles.tableContainer} component={Paper}>
          <Table className={styles.table} aria-label='simple table'>
            <TableHead>
              <TableRow className={styles.tableRow}>
                <TableCell className={styles.tableCell}>№</TableCell>
                <TableCell className={styles.tableCell}>Дата</TableCell>
                <TableCell className={styles.tableCell}>ФИО</TableCell>
                <TableCell className={styles.tableCell}>Telegram</TableCell>
                <TableCell className={styles.tableCell}>Email</TableCell>
                <TableCell className={styles.tableCell}>Телефон</TableCell>
                <TableCell className={styles.tableCell}>Стоимость</TableCell>
                <TableCell className={styles.tableCell}>Адрес</TableCell>
                <TableCell className={styles.tableCellBig}>
                  Комментарии
                </TableCell>
                <TableCell className={styles.tableCellBig}>Размеры</TableCell>
                <TableCell className={styles.tableCell}>Товары</TableCell>
                <TableCell className={styles.tableCell}>Статус</TableCell>
                <TableCell className={styles.tableCellBig}>
                  Комментарии менеджера
                </TableCell>
                <TableCell className={styles.tableCell}>
                  Варианты статуса
                </TableCell>
                <TableCell className={styles.tableCell}>
                  Изменение статуса
                </TableCell>
                <TableCell className={styles.tableCell}>
                  Формирование задания
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders?.map((order: IOrderAdmin) => (
                <TableRow
                  key={order.id}
                  sx={{
                    backgroundColor:
                      order?.status === 'Заказ создан' ||
                      order?.status ===
                        'Уточнение мерок, отправка реквизитов для внесения предоплаты' ||
                      order?.status === 'Ожидание предоплаты' ||
                      order?.status === 'Предоплата получена'
                        ? 'lightblue'
                        : order?.status === 'Задание сформировано' ||
                          order?.status ===
                            'Задание передано на производство' ||
                          order?.status ===
                            'Обратная связь по заданию от производства' ||
                          order?.status === 'Изделия в производстве'
                        ? 'lightyellow'
                        : order?.status === 'Изделие отшито' ||
                          order?.status === 'Забрали заказ с производства'
                        ? 'pink'
                        : order?.status ===
                            'Оповещение клиента, отправка реквизитов для внесения полной оплаты' ||
                          order?.status === 'Получена полная оплата'
                        ? 'rgba(158, 255, 158, 0.39)'
                        : order?.status === 'Заказ отправлен'
                        ? 'lightgreen'
                        : order?.status === 'Возврат заказа' ||
                          order?.status === 'Перешив заказа'
                        ? 'rgba(255, 0, 0, 0.409)'
                        : 'inherit',
                  }}
                >
                  <TableCell className={styles.tableCell}>{order.id}</TableCell>
                  <TableCell className={styles.tableCell}>
                    {order.createdAt.toString().slice(0, 10).replace(/-/g, '.')}
                  </TableCell>
                  <TableCell className={styles.tableCell}>
                    {order.User.full_name}
                  </TableCell>
                  <TableCell className={styles.tableCell}>
                    {order.User.telegram}
                  </TableCell>
                  <TableCell className={styles.tableCell}>
                    {order.User.email}
                  </TableCell>
                  <TableCell className={styles.tableCell}>
                    {order.User.phone}
                  </TableCell>
                  <TableCell className={styles.tableCell}>
                    {order.total.toLocaleString()}
                  </TableCell>
                  <TableCell className={styles.tableCell}>
                    {order.address}
                  </TableCell>
                  <TableCell className={styles.tableCell}>
                    {order.comments}
                  </TableCell>
                  <TableCell className={styles.tableCell}>
                    {order.Items.map((item) => (
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                        key={item.article}
                      >
                        <p
                          style={{
                            borderBottom: '0.5px solid black',
                            marginBottom: '5px',
                          }}
                        >
                          {item.article}: {item.OrderItem.measurements}
                        </p>
                      </div>
                    ))}
                  </TableCell>
                  <TableCell className={styles.tableCell}>
                    {order.Items.map((item) => (
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                        key={item.article}
                      >
                        {item.name}, {item.article}
                      </div>
                    ))}
                  </TableCell>
                  <TableCell className={styles.tableCell}>
                    {order.status}
                  </TableCell>
                  <TableCell className={styles.tableCell}>
                    {order.id === editingOrderId ? (
                      <div>
                        <input
                          type='text'
                          value={newAdminComment}
                          onChange={handleCommentChange}
                        />
                        <button onClick={handleCommentConfirm}>Confirm</button>
                      </div>
                    ) : (
                      <span
                        onClick={() =>
                          handleCommentClick(order.id, order.admin_comments)
                        }
                      >
                        {order.admin_comments}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className={styles.tableCell}>
                    <select
                      onChange={changeHandler}
                      className={styles.select}
                      name='status'
                    >
                      <option value='Заказ создан'>{'Заказ создан'}</option>
                      <option value='Уточнение мерок, отправка реквизитов для внесения предоплаты'>
                        {
                          'Уточнение мерок, отправка реквизитов для внесения предоплаты'
                        }
                      </option>
                      <option value='Ожидание предоплаты'>
                        {'Ожидание предоплаты'}
                      </option>
                      <option value='Предоплата получена'>
                        {'Предоплата получена'}
                      </option>
                      <option value='Задание сформировано'>
                        {'Задание сформировано'}
                      </option>
                      <option value='Задание передано на производство'>
                        {'Задание передано на производство'}
                      </option>
                      <option value='Обратная связь по заданию от производства'>
                        {'Обратная связь по заданию от производства'}
                      </option>
                      <option value='Изделия в производстве'>
                        {'Изделия в производстве'}
                      </option>
                      <option value='Изделие отшито'>{'Изделие отшито'}</option>
                      <option value='Забрали заказ с производства'>
                        {'Забрали заказ с производства'}
                      </option>
                      <option value='Оповещение клиента, отправка реквизитов для внесения полной оплаты'>
                        {
                          'Оповещение клиента, отправка реквизитов для внесения полной оплаты'
                        }
                      </option>
                      <option value='Получена полная оплата'>
                        {'Получена полная оплата'}
                      </option>
                      <option value='Заказ отправлен'>
                        {'Заказ отправлен'}
                      </option>
                      <option value='Возврат заказа'>{'Возврат заказа'}</option>
                      <option value='Перешив заказа'>{'Перешив заказа'}</option>
                    </select>
                  </TableCell>
                  <TableCell className={styles.tableCell}>
                    <Button
                      className={styles.button}
                      onClick={() => updateHandler(order.id)}
                      type='submit'
                      variant='contained'
                    >
                      Изменить
                    </Button>
                  </TableCell>
                  <TableCell className={styles.tableCell}>
                    <Button
                      className={styles.button}
                      type='submit'
                      variant='contained'
                    >
                      Задание
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <InfoModal info={message} open={open} setOpen={setOpen} />
      </div>
    </>
  );
}
