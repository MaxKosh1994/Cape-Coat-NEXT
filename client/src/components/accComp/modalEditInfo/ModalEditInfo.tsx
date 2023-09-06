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
    telegram_instagram: userInfo?.telegram_instagram || '',
  });

  const [info, setInfo] = useState('');

  useEffect(() => {
    setInputsUserInfo({
      full_name: userInfo?.full_name,
      phone: userInfo?.phone,
      telegram_instagram: userInfo?.telegram_instagram,
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
      <Box className={styles.container}>
        <form onSubmit={handleClose}>
          <div className={styles.formDiv}>
            {info.length > 0 && (
              <div className={styles.infoDiv}>
                <p className={styles.infoP}>{info}</p>
              </div>
            )}
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
              label='Ваш Telegram/Instagram'
              name='telegram_instagram'
              type='text'
              value={inputsUserInfo?.telegram_instagram || ''}
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
