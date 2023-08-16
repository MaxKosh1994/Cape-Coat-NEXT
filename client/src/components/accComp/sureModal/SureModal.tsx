import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import styles from './sureModal.module.css';
import { signOutUserThunk } from '../../../app/thunkActionsAuth';
import { useDispatch } from 'react-redux';
import { checkSession } from '../../../app/sessionSlice';

export default function SureModal({ open, setOpen }: ISureModal) {
  const dispatch = useDispatch();
  const [info, setInfo] = useState('');

  const logOutHandler = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      await dispatch(signOutUserThunk());
      setInfo('Вы вышли из аккаунта');
      setOpen(false);
      dispatch(checkSession(false));
    } catch (Error) {
      console.log(Error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box className={styles.box}>
        <div className={styles.mainContainer}>
          {info.length > 0 && <p>{info}</p>}
          <div className={styles.questionContainer}>
            <h3>Вы уверены, что хотите выйти из аккаунта?</h3>
          </div>
          <div className={styles.buttonContainer}>
            <Button
              onClick={() => setOpen(false)}
              className={styles.button}
              type='submit'
              variant='contained'
              color='secondary'
            >
              Отмена
            </Button>
            <Button
              onClick={logOutHandler}
              className={styles.button}
              type='submit'
              variant='contained'
              color='primary'
            >
              Выйти
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
}
