import { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Modal } from '@mui/material';
import {
  allOrderDataFetch,
  updateOrderFieldFetch,
  updateOrderDataFetch,
  updateOrderItemFieldFetch,
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
  Checkbox,
} from '@mui/material';
import InfoModal from '../../components/Admin/InfoModal';
import NavAdminComp from '@/components/navAdminComp/NavAdminComp';
import { IOrderAdmin } from '@/components/Admin/order/types';
import InfoContainer from '@/components/Admin/infoContainer/infoContainer';
import TasksForm from '@/components/Admin/TasksForm/TasksForm';
import {
  IItemData,
  ITaskInfo,
} from '@/components/Admin/TasksForm/taskformTypes';
import Head from 'next/head';

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

  const handleFieldChangeBoolean = (event) => {
    setEditingOrderData((prev) => ({
      ...prev,
      value: event.target.checked,
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

  //! --------------------Логика изменения полей с мерками--------------------------

  const handleFieldClickMeasurements = (
    orderId,
    itemId,
    currentField,
    currentFieldValue
  ) => {
    setEditingOrderData({
      id: orderId,
      itemId: itemId,
      field: currentField,
      value: currentFieldValue?.toString(),
    });
  };

  const handleFieldConfirmMeasurements = async () => {
    const { id, itemId, field, value } = editingOrderData;

    const updatedOrder = await updateOrderItemFieldFetch(
      id,
      itemId,
      field,
      value
    );
    if (updatedOrder) {
      const newOrders = orders.map((order) =>
        order.id === id ? updatedOrder : order
      );
      setOrders(newOrders);
    }
    setEditingOrderData({
      id: null,
      itemId: null,
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

  let ordersByMonth = orders?.reduce((acc, order) => {
    let date = format(parseISO(order?.createdAt), 'MMMM yyyy');
    let found = acc.find((a) => a.date === date);

    if (!found) {
      acc.push({ date: date, orders: [order] });
    } else {
      found.orders.push(order);
    }

    return acc;
  }, []);

  ordersByMonth = ordersByMonth?.sort((a, b) => {
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

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [itemInfo, setItemInfo] = useState<IItemData>({
    id: 0,
    name: '',
    article: '',
    description: '',
    model_params: '',
    characteristics: '',
    price: 0,
    new_price: 0,
    in_stock: false,
    bestseller: false,
    collection_id: 0,
    material_id: 0,
    category_id: 0,
    createdAt: '',
    updatedAt: '',
    OrderItem: {
      order_id: 0,
      item_id: 0,
      height: '',
      length: '',
      sleeve: '',
      bust: '',
      waist: '',
      hips: '',
      saddle: '',
      loops: false,
      buttons: '',
      lining: '',
      createdAt: '',
      updatedAt: '',
    },
    Material: {
      id: 0,
      name: '',
      photo: '',
      category_id: 0,
      createdAt: '',
      updatedAt: '',
    },
  });
  const [taskInfo, setTaskInfo] = useState<ITaskInfo>({
    id: 0,
    createdAt: '',
    updatedAt: '',
  });

  const handleFormTask = async (item: IItemData) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}admin/tasks/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(item),
    });
    const res = await response.json();
    setTaskInfo(res.newTask);
    setItemInfo(item);
    setOpenModal(true);
  };

  return (
    <>
      <Head>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <NavAdminComp />
      <InfoContainer />
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
                <TableCell sx={{ padding: '0px' }} className={styles.tableCell}>
                  №
                </TableCell>
                <TableCell sx={{ padding: '0px' }} className={styles.tableCell}>
                  Срочность
                </TableCell>
                <TableCell className={styles.tableMiddleCell}>
                  Дата оформления*
                </TableCell>
                <TableCell className={styles.tableMiddleCell}>
                  Дата готовности
                </TableCell>
                <TableCell className={styles.tableCell}>ФИО*</TableCell>
                <TableCell className={styles.tableCell}>
                  Telegram/Insta*
                </TableCell>
                <TableCell className={styles.tableCell}>Email*</TableCell>
                <TableCell className={styles.tableCell}>Телефон*</TableCell>
                <TableCell className={styles.tableCell}>Тип оплаты</TableCell>
                <TableCell className={styles.tableCell}>Стоимость</TableCell>
                <TableCell className={styles.tableCell}>Предоплата</TableCell>
                <TableCell className={styles.tableCell}>Остаток*</TableCell>
                <TableCell className={styles.tableMiddleCell}>Адрес</TableCell>
                <TableCell className={styles.tableCellBig}>
                  Комментарии
                </TableCell>

                <TableCell className={styles.tableCellMini}>Рост</TableCell>
                <TableCell className={styles.tableCellMini}>Длина</TableCell>
                <TableCell className={styles.tableCellMini}>Рукав</TableCell>
                <TableCell className={styles.tableCellMini}>Об.груди</TableCell>
                <TableCell className={styles.tableCellMini}>Талия</TableCell>
                <TableCell className={styles.tableCellMini}>Бёдра</TableCell>
                <TableCell className={styles.tableCellMini}>Седло</TableCell>
                <TableCell className={styles.tableCellMini}>Петли</TableCell>
                <TableCell className={styles.tableCellMini}>
                  Кнопки/Пуговицы
                </TableCell>
                <TableCell className={styles.tableCellMini}>
                  Подкладка
                </TableCell>

                <TableCell className={styles.tableMiddleCell}>
                  Товары*
                </TableCell>
                <TableCell className={styles.tableMiddleCell}>
                  Материалы*
                </TableCell>
                <TableCell className={styles.tableCellBig}>
                  Комментарии менеджера
                </TableCell>
                <TableCell className={styles.tableMiddleCell}>Статус</TableCell>
                <TableCell className={styles.tableCell}>Задание</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ordersByMonth[pageNumber]?.orders?.map((order: IOrderAdmin) => (
                <TableRow
                  key={order.id}
                  sx={{
                    backgroundColor:
                      order?.status === 'Заказ создан' ||
                      order?.status ===
                        'Уточнение мерок, отправка реквизитов для внесения предоплаты' ||
                      order?.status === 'Ожидание предоплаты' ||
                      order?.status === 'Предоплата получена'
                        ? 'rgba(147, 215, 255, 0.392)'
                        : order?.status === 'Задание сформировано' ||
                          order?.status ===
                            'Задание передано на производство' ||
                          order?.status ===
                            'Обратная связь по заданию от производства' ||
                          order?.status === 'Изделия в производстве'
                        ? 'rgba(237, 255, 186, 0.39)'
                        : order?.status === 'Изделие отшито' ||
                          order?.status === 'Забрали заказ с производства'
                        ? 'rgba(222, 142, 230, 0.49)'
                        : order?.status ===
                            'Оповещение клиента, отправка реквизитов для внесения полной оплаты' ||
                          order?.status === 'Получена полная оплата'
                        ? 'rgba(158, 255, 158, 0.39)'
                        : order?.status === 'Заказ отправлен'
                        ? 'rgba(133, 317, 130, 0.69)'
                        : order?.status === 'Возврат заказа' ||
                          order?.status === 'Перешив заказа'
                        ? 'rgba(220, 61, 61, 0.79)'
                        : 'inherit',
                  }}
                >
                  <TableCell className={styles.tableCell}>
                    {order?.id}
                  </TableCell>

                  <TableCell
                    sx={{
                      backgroundColor: order?.urgent ? 'red' : 'inherit',
                    }}
                    className={styles.tableCell}
                    onClick={() =>
                      handleFieldClick(order?.id, 'urgent', !order?.urgent)
                    }
                  >
                    {editingOrderData.id === order?.id &&
                    editingOrderData.field === 'urgent' ? (
                      <div className={styles.checkBoxContainer}>
                        <Checkbox
                          className={styles.checkBox}
                          checked={
                            editingOrderData.value === 'urgent'
                              ? order?.urgent
                              : editingOrderData.value
                          }
                          onChange={handleFieldChangeBoolean}
                          inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                        <Button
                          className={styles.buttonInput}
                          type='submit'
                          variant='contained'
                          onClick={handleFieldConfirm}
                        >
                          Изменить
                        </Button>
                      </div>
                    ) : (
                      <div>{order?.urgent ? 'Срочно' : 'Не срочно'}</div>
                    )}
                  </TableCell>

                  <TableCell className={styles.tableCell}>
                    <span>
                      {format(parseISO(order?.createdAt), "dd MMMM yyyy'г'", {
                        locale: ru,
                      })}
                    </span>
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
                          className={styles.dateInput}
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
                    ) : order?.getReadyAt ? (
                      <span>
                        {format(
                          parseISO(order?.getReadyAt),
                          "dd MMMM yyyy'г'",
                          {
                            locale: ru,
                          }
                        )}
                      </span>
                    ) : (
                      <span></span>
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
                      handleFieldClick(
                        order?.id,
                        'payment_type',
                        order?.payment_type
                      )
                    }
                  >
                    {editingOrderData.id === order?.id &&
                    editingOrderData.field === 'payment_type' ? (
                      <div className={styles.inputContainer}>
                        <input
                          style={{ width: '100px' }}
                          onChange={handleFieldChange}
                          className={styles.inputText}
                          type='text'
                          fullWidth
                          required
                          value={editingOrderData.value}
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
                      <span>{order?.payment_type}</span>
                    )}
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
                        <input
                          style={{ width: '100px', fontSize: 'medium' }}
                          onChange={handleFieldChange}
                          className={styles.inputText}
                          type='number'
                          required
                          value={editingOrderData.value}
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
                        <input
                          style={{ width: '100px', fontSize: 'medium' }}
                          onChange={handleFieldChange}
                          className={styles.inputText}
                          type='number'
                          required
                          value={editingOrderData.value}
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
                    {order?.residual_amount?.toLocaleString()}
                  </TableCell>
                  <TableCell
                    className={styles.tableCell}
                    onClick={() =>
                      handleFieldClick(order?.id, 'address', order?.address)
                    }
                  >
                    {editingOrderData.id === order?.id &&
                    editingOrderData.field === 'address' ? (
                      <div className={styles.inputContainer}>
                        <input
                          onChange={handleFieldChange}
                          className={styles.inputText}
                          type='text'
                          name='address'
                          placeholder='Введите адрес...'
                          value={editingOrderData.value}
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
                      <span>{order?.address}</span>
                    )}
                  </TableCell>
                  <TableCell
                    className={styles.tableCell}
                    onClick={() =>
                      handleFieldClick(order?.id, 'comments', order?.comments)
                    }
                  >
                    {editingOrderData.id === order?.id &&
                    editingOrderData.field === 'comments' ? (
                      <div className={styles.inputContainer}>
                        <TextField
                          sx={{
                            height: '80px',
                            fontSize: '14px',
                            paddingTop: '4px',
                            paddingBottom: '4px',
                          }}
                          type='text'
                          className='text-field'
                          fullWidth
                          required
                          multiline
                          rows={4}
                          value={editingOrderData.value}
                          onChange={handleFieldChange}
                          InputProps={{
                            sx: {
                              fontSize: '14px',
                              paddingTop: '2px',
                              paddingBottom: '2px',
                            },
                          }}
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
                      <span>{order?.comments}</span>
                    )}
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
                        {editingOrderData.id === order?.id &&
                        editingOrderData.itemId === item?.id &&
                        editingOrderData.field === 'height' ? (
                          <div className={styles.inputContainer}>
                            <input
                              style={{ width: '100px', fontSize: 'medium' }}
                              type='number'
                              className='text-field'
                              required
                              autoFocus
                              value={editingOrderData.value}
                              onChange={handleFieldChange}
                            />
                            <Button
                              className={styles.buttonInput}
                              type='submit'
                              variant='contained'
                              onClick={handleFieldConfirmMeasurements}
                            >
                              Сохранить
                            </Button>
                          </div>
                        ) : (
                          <p
                            style={{
                              borderBottom: '0.5px solid black',
                              marginBottom: '10px',
                              marginTop: '5px',
                            }}
                            onClick={() =>
                              handleFieldClickMeasurements(
                                order?.id,
                                item?.id,
                                'height',
                                item?.OrderItem?.height
                              )
                            }
                          >
                            {item?.article}: {item?.OrderItem?.height}
                          </p>
                        )}
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
                        key={item?.id}
                      >
                        {editingOrderData.id === order?.id &&
                        editingOrderData.itemId === item?.id &&
                        editingOrderData.field === 'length' ? (
                          <div className={styles.inputContainer}>
                            <input
                              style={{ width: '100px', fontSize: 'medium' }}
                              type='number'
                              className='text-field'
                              required
                              autoFocus
                              value={editingOrderData.value}
                              onChange={handleFieldChange}
                            />
                            <Button
                              className={styles.buttonInput}
                              type='submit'
                              variant='contained'
                              onClick={handleFieldConfirmMeasurements}
                            >
                              Сохранить
                            </Button>
                          </div>
                        ) : (
                          <p
                            style={{
                              borderBottom: '0.5px solid black',
                              marginBottom: '10px',
                              marginTop: '5px',
                            }}
                            onClick={() =>
                              handleFieldClickMeasurements(
                                order?.id,
                                item?.id,
                                'length',
                                item?.OrderItem?.length
                              )
                            }
                          >
                            {item?.article}: {item?.OrderItem?.length}
                          </p>
                        )}
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
                        key={item?.id}
                      >
                        {editingOrderData.id === order?.id &&
                        editingOrderData.itemId === item?.id &&
                        editingOrderData.field === 'sleeve' ? (
                          <div className={styles.inputContainer}>
                            <input
                              style={{ width: '100px', fontSize: 'medium' }}
                              type='number'
                              className='text-field'
                              required
                              autoFocus
                              value={editingOrderData.value}
                              onChange={handleFieldChange}
                            />
                            <Button
                              className={styles.buttonInput}
                              type='submit'
                              variant='contained'
                              onClick={handleFieldConfirmMeasurements}
                            >
                              Сохранить
                            </Button>
                          </div>
                        ) : (
                          <p
                            style={{
                              borderBottom: '0.5px solid black',
                              marginBottom: '10px',
                              marginTop: '5px',
                            }}
                            onClick={() =>
                              handleFieldClickMeasurements(
                                order?.id,
                                item?.id,
                                'sleeve',
                                item?.OrderItem?.sleeve
                              )
                            }
                          >
                            {item?.article}: {item?.OrderItem?.sleeve}
                          </p>
                        )}
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
                        key={item?.id}
                      >
                        {editingOrderData.id === order?.id &&
                        editingOrderData.itemId === item?.id &&
                        editingOrderData.field === 'bust' ? (
                          <div className={styles.inputContainer}>
                            <input
                              style={{ width: '100px', fontSize: 'medium' }}
                              type='number'
                              className='text-field'
                              required
                              autoFocus
                              value={editingOrderData.value}
                              onChange={handleFieldChange}
                            />
                            <Button
                              className={styles.buttonInput}
                              type='submit'
                              variant='contained'
                              onClick={handleFieldConfirmMeasurements}
                            >
                              Сохранить
                            </Button>
                          </div>
                        ) : (
                          <p
                            style={{
                              borderBottom: '0.5px solid black',
                              marginBottom: '10px',
                              marginTop: '5px',
                            }}
                            onClick={() =>
                              handleFieldClickMeasurements(
                                order?.id,
                                item?.id,
                                'bust',
                                item?.OrderItem?.bust
                              )
                            }
                          >
                            {item?.article}: {item?.OrderItem?.bust}
                          </p>
                        )}
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
                        key={item?.id}
                      >
                        {editingOrderData.id === order?.id &&
                        editingOrderData.itemId === item?.id &&
                        editingOrderData.field === 'waist' ? (
                          <div className={styles.inputContainer}>
                            <input
                              style={{ width: '100px', fontSize: 'medium' }}
                              type='number'
                              className='text-field'
                              required
                              autoFocus
                              value={editingOrderData.value}
                              onChange={handleFieldChange}
                            />
                            <Button
                              className={styles.buttonInput}
                              type='submit'
                              variant='contained'
                              onClick={handleFieldConfirmMeasurements}
                            >
                              Сохранить
                            </Button>
                          </div>
                        ) : (
                          <p
                            style={{
                              borderBottom: '0.5px solid black',
                              marginBottom: '10px',
                              marginTop: '5px',
                            }}
                            onClick={() =>
                              handleFieldClickMeasurements(
                                order?.id,
                                item?.id,
                                'waist',
                                item?.OrderItem?.waist
                              )
                            }
                          >
                            {item?.article}: {item?.OrderItem?.waist}
                          </p>
                        )}
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
                        key={item?.id}
                      >
                        {editingOrderData.id === order?.id &&
                        editingOrderData.itemId === item?.id &&
                        editingOrderData.field === 'hips' ? (
                          <div className={styles.inputContainer}>
                            <input
                              style={{ width: '100px', fontSize: 'medium' }}
                              type='number'
                              className='text-field'
                              required
                              autoFocus
                              value={editingOrderData.value}
                              onChange={handleFieldChange}
                            />
                            <Button
                              className={styles.buttonInput}
                              type='submit'
                              variant='contained'
                              onClick={handleFieldConfirmMeasurements}
                            >
                              Сохранить
                            </Button>
                          </div>
                        ) : (
                          <p
                            style={{
                              borderBottom: '0.5px solid black',
                              marginBottom: '10px',
                              marginTop: '5px',
                            }}
                            onClick={() =>
                              handleFieldClickMeasurements(
                                order?.id,
                                item?.id,
                                'hips',
                                item?.OrderItem?.hips
                              )
                            }
                          >
                            {item?.article}: {item?.OrderItem?.hips}
                          </p>
                        )}
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
                        key={item?.id}
                      >
                        {editingOrderData.id === order?.id &&
                        editingOrderData.itemId === item?.id &&
                        editingOrderData.field === 'saddle' ? (
                          <div className={styles.inputContainer}>
                            <input
                              style={{ width: '100px', fontSize: 'medium' }}
                              type="text"
                              className="text-field"
                              required
                              autoFocus
                              value={editingOrderData.value}
                              onChange={handleFieldChange}
                            />
                            <Button
                              className={styles.buttonInput}
                              type='submit'
                              variant='contained'
                              onClick={handleFieldConfirmMeasurements}
                            >
                              Сохранить
                            </Button>
                          </div>
                        ) : (
                          <p
                            style={{
                              borderBottom: '0.5px solid black',
                              marginBottom: '10px',
                              marginTop: '5px',
                            }}
                            onClick={() =>
                              handleFieldClickMeasurements(
                                order?.id,
                                item?.id,
                                'saddle',
                                item?.OrderItem?.saddle
                              )
                            }
                          >
                            {item?.article}: {item?.OrderItem?.saddle}
                          </p>
                        )}
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
                        key={item?.id}
                      >
                        {editingOrderData.id === order?.id &&
                        editingOrderData.itemId === item?.id &&
                        editingOrderData.field === 'loops' ? (
                          <div className={styles.checkBoxContainer}>
                            <Checkbox
                              className={styles.checkBox}
                              checked={
                                editingOrderData.value === undefined
                                  ? item?.OrderItem?.loops
                                  : editingOrderData.value
                              }
                              onChange={handleFieldChangeBoolean}
                            />
                            <Button
                              className={styles.buttonCheckBox}
                              type='submit'
                              variant='contained'
                              onClick={handleFieldConfirmMeasurements}
                            >
                              Сохранить
                            </Button>
                          </div>
                        ) : (
                          <p
                            style={{
                              borderBottom: '0.5px solid black',
                              marginBottom: '10px',
                              marginTop: '5px',
                            }}
                            onClick={() =>
                              handleFieldClickMeasurements(
                                order?.id,
                                item?.id,
                                'loops',
                                !item?.OrderItem?.loops
                              )
                            }
                          >
                            {item?.article}:
                            <Checkbox
                              className={styles.checkBox}
                              checked={item?.OrderItem?.loops}
                              disabled
                            />
                          </p>
                        )}
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
                        key={item?.id}
                      >
                        {editingOrderData.id === order?.id &&
                        editingOrderData.itemId === item?.id &&
                        editingOrderData.field === 'buttons' ? (
                          <div className={styles.inputContainer}>
                            <input
                              type='text'
                              style={{ width: '100px', fontSize: 'medium' }}
                              className='text-field'
                              required
                              autoFocus
                              value={editingOrderData.value}
                              onChange={handleFieldChange}
                            />
                            <Button
                              className={styles.buttonInput}
                              type='submit'
                              variant='contained'
                              onClick={handleFieldConfirmMeasurements}
                            >
                              Сохранить
                            </Button>
                          </div>
                        ) : (
                          <p
                            style={{
                              borderBottom: '0.5px solid black',
                              marginBottom: '10px',
                              marginTop: '5px',
                            }}
                            onClick={() =>
                              handleFieldClickMeasurements(
                                order?.id,
                                item?.id,
                                'buttons',
                                item?.OrderItem?.buttons
                              )
                            }
                          >
                            {item?.article}: {item?.OrderItem?.buttons}
                          </p>
                        )}
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
                        key={item?.id}
                      >
                        {editingOrderData.id === order?.id &&
                        editingOrderData.itemId === item?.id &&
                        editingOrderData.field === 'lining' ? (
                          <div className={styles.inputContainer}>
                            <input
                              type='text'
                              style={{ width: '100px', fontSize: 'medium' }}
                              className='text-field'
                              required
                              autoFocus
                              value={editingOrderData.value}
                              onChange={handleFieldChange}
                            />
                            <Button
                              className={styles.buttonInput}
                              type='submit'
                              variant='contained'
                              onClick={handleFieldConfirmMeasurements}
                            >
                              Сохранить
                            </Button>
                          </div>
                        ) : (
                          <p
                            style={{
                              borderBottom: '0.5px solid black',
                              marginBottom: '10px',
                              marginTop: '5px',
                            }}
                            onClick={() =>
                              handleFieldClickMeasurements(
                                order?.id,
                                item?.id,
                                'lining',
                                item?.OrderItem?.lining
                              )
                            }
                          >
                            {item?.article}: {item?.OrderItem?.lining}
                          </p>
                        )}
                      </div>
                    ))}
                  </TableCell>

                  <TableCell className={styles.tableCell}>
                    {order?.Items?.map((item) => (
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          borderBottom: '0.5px solid black',
                          marginBottom: '10px',
                          marginTop: '5px',
                        }}
                        key={item?.article}
                      >
                        {item?.name}, арт:{item?.article}
                        {item?.in_stock && (
                          <span
                            style={{
                              backgroundColor: 'red',
                              width: '60%',
                              color: 'white',
                              padding: '1px',
                              borderRadius: '5px',
                            }}
                          >
                            В НАЛИЧИИ
                          </span>
                        )}
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
                        key={item?.id}
                      >
                        {editingOrderData.id === order?.id &&
                        editingOrderData.itemId === item?.id &&
                        editingOrderData.field === 'selected_material' ? (
                          <div className={styles.inputContainer}>
                            <input
                              type="text"
                              style={{ width: '100px', fontSize: 'medium' }}
                              className="text-field"
                              required
                              autoFocus
                              value={editingOrderData.value}
                              onChange={handleFieldChange}
                            />
                            <Button
                              className={styles.buttonInput}
                              type="submit"
                              variant="contained"
                              onClick={handleFieldConfirmMeasurements}
                            >
                              Сохранить
                            </Button>
                          </div>
                        ) : (
                          <p
                            style={{
                              borderBottom: '0.5px solid black',
                              marginBottom: '10px',
                              marginTop: '5px',
                            }}
                            onClick={() =>
                              handleFieldClickMeasurements(
                                order?.id,
                                item?.id,
                                'selected_material',
                                item?.OrderItem?.selected_material
                              )
                            }
                          >
                            {item?.article}:{' '}
                            {item?.OrderItem?.selected_material}
                          </p>
                        )}
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
                          sx={{
                            height: '80px',
                            fontSize: '14px',
                            paddingTop: '4px',
                            paddingBottom: '4px',
                          }}
                          type='text'
                          className='text-field'
                          fullWidth
                          required
                          multiline
                          rows={4}
                          value={editingOrderData.value}
                          onChange={handleFieldChange}
                          InputProps={{
                            sx: {
                              fontSize: '14px',
                              paddingTop: '2px',
                              paddingBottom: '2px',
                            },
                          }}
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
                  <TableCell
                    className={styles.tableCell}
                    onClick={() =>
                      handleFieldClick(order?.id, 'status', order?.status)
                    }
                  >
                    {editingOrderData.id === order?.id &&
                    editingOrderData.field === 'status' ? (
                      <div className={styles.inputContainer}>
                        <select
                          onChange={handleFieldChange}
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
                          <option value='Изделие отшито'>
                            {'Изделие отшито'}
                          </option>
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
                          <option value='Возврат заказа'>
                            {'Возврат заказа'}
                          </option>
                          <option value='Перешив заказа'>
                            {'Перешив заказа'}
                          </option>
                        </select>
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
                      <span>{order?.status}</span>
                    )}
                  </TableCell>
                  <TableCell className={styles.tableCell}>
                    {order?.Items?.map((item) => (
                      <Button
                        key={item.id}
                        className={styles.button}
                        type='submit'
                        variant='contained'
                        onClick={() => handleFormTask(item)}
                      >
                        Сформировать
                      </Button>
                    ))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TasksForm
          openModal={openModal}
          itemInfo={itemInfo}
          taskInfo={taskInfo}
          setOpenModal={setOpenModal}
        />
        {/* <InfoModal info={message} open={open} setOpen={setOpen} /> */}
      </div>
    </>
  );
}
