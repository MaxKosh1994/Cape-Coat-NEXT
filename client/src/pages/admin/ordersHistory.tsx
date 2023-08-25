import { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';
import {
  allOrderDataFetch,
  updateOrderFieldFetch,
  updateOrderDataFetch,
  //   updateOrderCommentsFetch,
  //   updateOrderPrepaymentFetch,
  //   updateOrderTotalFetch,
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
  TextField,
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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    allOrderDataFetch(setOrders);
  }, []);

  //! ----------------------------------------------------------------

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
  //! ---------------------------ЛОГИКА ИЗМЕНЕНИЯ ПОЛЕЙ ЗАКАЗА-------------------------------------

  const [editingOrderData, setEditingOrderData] = useState({
    id: null,
    field: '',
    value: '',
  });

  const handleFieldClick = (orderId, currentField, currentFieldValue) => {
    setEditingOrderData({
      id: orderId,
      field: currentField,
      value: currentFieldValue.toString(),
    });
  };

  const handleFieldChange = (event) => {
    setEditingOrderData((prev) => ({
      ...prev,
      value: event.target.value,
    }));
  };

  const handleFieldConfirm = async () => {
    const { id, field, value } = editingOrderData;
    const updatedOrder = await updateOrderFieldFetch(id, field, value);
    if (updatedOrder) {
      const newOrders = orders.map((order) =>
        order.id === id ? updatedOrder : order
      );
      setOrders(newOrders);
    }
    setEditingOrderData({
      id: null,
      field: '',
      value: '',
    });
  };

  //! --------------------Логика пагинации-------------------------------------------

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  let ordersByMonth = orders.reduce((acc, order) => {
    let date = format(parseISO(order.createdAt), 'MMMM yyyy');
    let found = acc.find((a) => a.date === date);

    if (!found) {
      acc.push({ date: date, orders: [order] });
    } else {
      found.orders.push(order);
    }

    return acc;
  }, []);

  ordersByMonth = ordersByMonth.sort((a, b) => {
    const dateA = new Date(
      a.date.split(' ')[1],
      months.indexOf(a.date.split(' ')[0])
    );
    const dateB = new Date(
      b.date.split(' ')[1],
      months.indexOf(b.date.split(' ')[0])
    );
    return dateA - dateB;
  });

  const [pageNumber, setPageNumber] = useState(0);

  return (
    <>
      <NavAdminComp />
      <div className={styles.mainDiv}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            margin: '10px 0',
          }}
        >
          <select
            onChange={(event) => setPageNumber(event.target.selectedIndex)}
            value={ordersByMonth[pageNumber]?.date}
            style={{
              padding: '5px 10px',
              fontSize: '16px',
            }}
          >
            {ordersByMonth.map((item, index) => (
              <option key={index} value={item.date}>
                {item.date}
              </option>
            ))}
          </select>
        </div>
        <TableContainer className={styles.tableContainer} component={Paper}>
          <Table className={styles.table} aria-label='simple table'>
            <TableHead>
              <TableRow className={styles.tableRow}>
                <TableCell className={styles.tableCell}>№</TableCell>
                <TableCell className={styles.tableMiddleCell}>
                  Дата оформления
                </TableCell>
                <TableCell className={styles.tableMiddleCell}>
                  Дата готовности
                </TableCell>
                <TableCell className={styles.tableCell}>ФИО</TableCell>
                <TableCell className={styles.tableCell}>
                  Telegram/Insta
                </TableCell>
                <TableCell className={styles.tableCell}>Email</TableCell>
                <TableCell className={styles.tableCell}>Телефон</TableCell>
                <TableCell className={styles.tableCell}>Стоимость</TableCell>
                <TableCell className={styles.tableCell}>Предоплата</TableCell>
                <TableCell className={styles.tableCell}>Остаток</TableCell>
                <TableCell className={styles.tableMiddleCell}>Адрес</TableCell>
                <TableCell className={styles.tableCellBig}>
                  Комментарии
                </TableCell>
                <TableCell className={styles.tableCellBig}>Размеры</TableCell>
                <TableCell className={styles.tableCell}>Товары</TableCell>
                <TableCell className={styles.tableCellBig}>
                  Комментарии менеджера
                </TableCell>
                <TableCell className={styles.tableMiddleCell}>Статус</TableCell>
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
              {ordersByMonth[pageNumber]?.orders.map((order: IOrderAdmin) => (
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
                    {format(parseISO(order?.createdAt), "dd MMMM yyyy'г'", {
                      locale: ru,
                    })}
                  </TableCell>
                  <TableCell
                    className={styles.tableCell}
                    onClick={() =>
                      handleFieldClick(
                        order?.id,
                        'getReadyAt',
                        order?.getReadyAt
                      )
                    }
                  >
                    {editingOrderData.id === order?.id &&
                    editingOrderData.field === 'getReadyAt' ? (
                      <div className={styles.inputContainer}>
                        <TextField
                          type='date'
                          className='text-field'
                          fullWidth
                          required
                          value={editingOrderData.value}
                          onChange={handleFieldChange}
                        />
                        <Button
                          className={styles.buttonInput}
                          type='submit'
                          variant='contained'
                          onClick={handleFieldConfirm}
                        >
                          Сохранить
                        </Button>
                      </div>
                    ) : (
                      format(parseISO(order.getReadyAt), "dd MMMM yyyy'г'", {
                        locale: ru,
                      })
                    )}
                  </TableCell>
                  <TableCell className={styles.tableCell}>
                    {order?.User?.full_name}
                  </TableCell>
                  <TableCell className={styles.tableCell}>
                    {order?.User?.telegram_instagram}
                  </TableCell>
                  <TableCell className={styles.tableCell}>
                    {order.User?.email}
                  </TableCell>
                  <TableCell className={styles.tableCell}>
                    {order.User?.phone}
                  </TableCell>
                  <TableCell
                    className={styles.tableCell}
                    onClick={() =>
                      handleFieldClick(order?.id, 'total', order?.total)
                    }
                  >
                    {editingOrderData.id === order?.id &&
                    editingOrderData.field === 'total' ? (
                      <div className={styles.inputContainer}>
                        <TextField
                          type='number'
                          className='text-field'
                          fullWidth
                          required
                          value={editingOrderData.value}
                          onChange={handleFieldChange}
                        />
                        <Button
                          className={styles.buttonInput}
                          type='submit'
                          variant='contained'
                          onClick={handleFieldConfirm}
                        >
                          Сохранить
                        </Button>
                      </div>
                    ) : (
                      <span>{order?.total}</span>
                    )}
                  </TableCell>
                  <TableCell
                    className={styles.tableCell}
                    onClick={() =>
                      handleFieldClick(
                        order?.id,
                        'prepayment',
                        order?.prepayment
                      )
                    }
                  >
                    {editingOrderData.id === order?.id &&
                    editingOrderData.field === 'prepayment' ? (
                      <div className={styles.inputContainer}>
                        <TextField
                          type='number'
                          className='text-field'
                          fullWidth
                          required
                          value={editingOrderData.value}
                          onChange={handleFieldChange}
                        />
                        <Button
                          className={styles.buttonInput}
                          type='submit'
                          variant='contained'
                          onClick={handleFieldConfirm}
                        >
                          Сохранить
                        </Button>
                      </div>
                    ) : (
                      <span>{order?.prepayment}</span>
                    )}
                  </TableCell>
                  <TableCell className={styles.tableCell}>
                    {order.residual_amount?.toLocaleString()}
                  </TableCell>
                  <TableCell className={styles.tableCell}>
                    {order?.address}
                  </TableCell>
                  <TableCell className={styles.tableCell}>
                    {order?.comments}
                  </TableCell>
                  <TableCell className={styles.tableCell}>
                    {order?.Items?.map((item) => (
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                        key={item?.article}
                      >
                        <p
                          style={{
                            borderBottom: '0.5px solid black',
                            marginBottom: '5px',
                          }}
                        >
                          {item?.article}: {item?.OrderItem?.measurements}
                        </p>
                      </div>
                    ))}
                  </TableCell>
                  <TableCell className={styles.tableCell}>
                    {order?.Items?.map((item) => (
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                        key={item?.article}
                      >
                        {item?.name}, арт:{item?.article}
                      </div>
                    ))}
                  </TableCell>
                  <TableCell
                    className={styles.tableCell}
                    onClick={() =>
                      handleFieldClick(
                        order?.id,
                        'admin_comments',
                        order?.admin_comments
                      )
                    }
                  >
                    {editingOrderData.id === order?.id &&
                    editingOrderData.field === 'admin_comments' ? (
                      <div className={styles.inputContainer}>
                        <TextField
                          type='text'
                          className='text-field'
                          fullWidth
                          required
                          multiline
                          rows={4}
                          value={editingOrderData.value}
                          onChange={handleFieldChange}
                        />
                        <Button
                          className={styles.buttonInput}
                          type='submit'
                          variant='contained'
                          onClick={handleFieldConfirm}
                        >
                          Сохранить
                        </Button>
                      </div>
                    ) : (
                      <span>{order?.admin_comments}</span>
                    )}
                  </TableCell>
                  <TableCell className={styles.tableCell}>
                    {order?.status}
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
                      onClick={() => updateHandler(order?.id)}
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
