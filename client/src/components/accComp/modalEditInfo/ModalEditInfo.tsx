import React, { ChangeEvent, useEffect, useState } from 'react';
import { Box, Button, Modal, TextField } from '@mui/material';
import styles from './ModalEditInfo.module.css';
import { IInputsEditInfo, IModalProps } from './types';
import { editUserInfo } from './FetchEditUserInfo';

export default function ModalEditInfo({
  open,
  setOpen,
  userInfo,
  setUserInfo,
}: IModalProps) {
  const [inputsUserInfo, setInputsUserInfo] = useState<IInputsEditInfo>({
    full_name: userInfo?.full_name || '',
    phone: userInfo?.phone || '',
    address: userInfo?.address || '',
    telegram: userInfo?.telegram || '',
  });

  const [info, setInfo] = useState('');

  useEffect(() => {
    setInputsUserInfo({
      full_name: userInfo?.full_name,
      phone: userInfo?.phone,
      address: userInfo?.address,
      telegram: userInfo?.telegram,
    });
  }, [userInfo]);

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInputsUserInfo({
      ...inputsUserInfo,
      [event.target.name]: event.target.value,
    });
  };

  const handleClose = (event: React.FormEvent) => {
    event.preventDefault();
    editUserInfo(inputsUserInfo, userInfo, setUserInfo, setOpen, setInfo);
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: '#eee',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
        className={styles.customModal}
      >
        <form onSubmit={handleClose}>
          <div className={styles.formDiv}>
            {info.length > 0 && <p>{info}</p>}
            <TextField
              autoComplete='off'
              className='text-field'
              label='ФИО'
              name='full_name'
              type='text'
              value={inputsUserInfo?.full_name || ''}
              fullWidth
              margin='normal'
              required
              onChange={changeHandler}
            />
            <TextField
              autoComplete='off'
              className='text-field'
              label='Адрес (Город, улица, дом, квартира, индекс)'
              name='address'
              type='text'
              value={inputsUserInfo?.address || ''}
              fullWidth
              margin='normal'
              onChange={changeHandler}
            />
            <TextField
              autoComplete='off'
              className='text-field'
              label='Номер телефона'
              name='phone'
              type='text'
              value={inputsUserInfo?.phone || ''}
              fullWidth
              margin='normal'
              onChange={changeHandler}
            />
            <TextField
              autoComplete='off'
              className='text-field'
              label='Ваш Telegram'
              name='telegram'
              type='text'
              value={inputsUserInfo?.telegram || ''}
              fullWidth
              margin='normal'
              onChange={changeHandler}
            />
            <Button
              className={styles.button}
              type='submit'
              variant='contained'
              color='primary'
              style={{
                backgroundColor: 'black',
                color: 'white',
              }}
            >
              Сохранить
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
}
