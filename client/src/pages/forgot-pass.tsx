import React, { useState, ChangeEvent, MouseEvent } from 'react';
import Head from 'next/head';
import styles from '../styles/Auth.module.css';
import { TextField, Button } from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { RootState } from '@/app/store';
import { useRouter } from 'next/router';
import { forgotPassThunk } from '@/app/thunkActionsAuth';

export default function ForgotPass() {
  const error = useAppSelector((state: RootState) => state.sessionSlice.error);
  const user = useAppSelector((state: RootState) => state.sessionSlice.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [currEmail, setCurrEmail] = useState('');
  const [showErrorMsg, setShowErrorMsg] = useState<boolean>(false);
  const [sentLink, setSentLink] = useState<string>('');
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrEmail(e.target.value);
  };
  const handleForgotPass = async (e) => {
    e.preventDefault();
    if (currEmail) {
      const response = await dispatch(forgotPassThunk({ email: currEmail }));
      response ? setSentLink(response.message) : setShowErrorMsg(true);
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
                marginRight: `30px`,
                marginTop: '5px',
                fontSize: '40px',
                color: 'green',
              }}
            />
            <p className={styles.successSent}>{sentLink}</p>
          </>
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
