import React, { useState, ChangeEvent, MouseEvent } from 'react';
import Head from 'next/head';
import styles from '../styles/Auth.module.css';
import { TextField, Button } from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CircularProgress from '@mui/material/CircularProgress';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { RootState } from '@/app/store';
import { forgotPassThunk } from '@/app/thunkActionsAuth';

export default function ForgotPass() {
  const error = useAppSelector((state: RootState) => state.sessionSlice.error);
  const dispatch = useAppDispatch();

  const [currEmail, setCurrEmail] = useState('');
  const [showErrorMsg, setShowErrorMsg] = useState<boolean>(false);
  const [sentLink, setSentLink] = useState<string>('');
  const [showSpinner, setShowSpinner] = useState<boolean>(false);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrEmail(e.target.value);
  };
  const handleForgotPass = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowSpinner(true);
    if (currEmail) {
      const response = await dispatch(forgotPassThunk({ email: currEmail }));
      if (response !== null) {
        // TODO ошибка типизации
        setSentLink(response.message);
        setShowSpinner(false);
      } else {
        setShowErrorMsg(true);
      }
    }
  };

  return (
    <>
      <Head>
        <title>Cape&Coat | Забыли пароль</title>
        <meta name="title" content="Cape and Coat" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.formContainer}>
        {sentLink ? (
          <>
            <TaskAltIcon
              style={{
                fontSize: '50px',
                color: 'green',
              }}
            />
            <p className={styles.successSent}>{sentLink}</p>
          </>
        ) : showSpinner ? (
          <CircularProgress color="inherit" />
        ) : (
          <form className={styles.signInForm}>
            <h3 className={styles.header}>Восстановление доступа</h3>
            {showErrorMsg && <p>{error}</p>}
            <TextField
              className={styles.textField}
              placeholder="Email"
              name="email"
              type="email"
              inputProps={{
                style: {
                  fontFamily: 'Ysabeau Infant',
                },
              }}
              value={currEmail}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{
                backgroundColor: 'black',
                color: 'white',
                marginTop: '15px',
              }}
              onClick={handleForgotPass}
            >
              Получить ссылку для сброса пароля
            </Button>
          </form>
        )}
      </div>
    </>
  );
}
