import React, { useState, ChangeEvent, MouseEvent } from 'react';
import Head from 'next/head';
import styles from '../../styles/Auth.module.css';
import { TextField, Button } from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { RootState } from '@/app/store';
import { useRouter } from 'next/router';
import { resetPassThunk } from '@/app/thunkActionsAuth';
import { handleError } from '@/app/sessionSlice';
import Link from 'next/link';

export default function ForgotPass() {
  const error = useAppSelector((state: RootState) => state.sessionSlice.error);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [newPass, setNewPass] = useState({ password1: '', password2: '' });
  const [showErrorMsg, setShowErrorMsg] = useState<boolean>(false);
  const [updSuccess, setUpdSuccess] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPass({ ...newPass, [e.target.name]: e.target.value });
  };

  const handleUpdPass = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { token } = router.query;
    if (
      newPass.password1 &&
      newPass.password2 &&
      newPass.password1 === newPass.password2
    ) {
      const response = await dispatch(resetPassThunk(token, newPass.password1));
      if (response?.success) {
        setShowErrorMsg(false);
        setUpdSuccess(response.message);
      } else {
        setShowErrorMsg(true);
      }
    } else {
      await dispatch(handleError({ message: 'Введенные пароли не совпадают' }));
      setShowErrorMsg(true);
    }
  };

  return (
    <>
      <Head>
        <title>Cape&Coat | Новый пароль</title>
        <meta name="title" content="Cape and Coat" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.formContainer}>
        {updSuccess ? (
          <>
            <TaskAltIcon
              style={{
                fontSize: '50px',
                color: 'green',
              }}
            />
            <div className={styles.successUpd}>
              {updSuccess} <Link href="/signin">Войдите в ваш аккаунт</Link>
            </div>
          </>
        ) : (
          <form className={styles.signInForm}>
            <h3 className={styles.header}>Введите новый пароль</h3>
            {showErrorMsg && <p className={styles.errMsg}>{error}</p>}
            <TextField
              className={styles.textField}
              placeholder="Пароль"
              name="password1"
              type="password"
              inputProps={{
                style: {
                  fontFamily: 'Ysabeau Infant',
                },
              }}
              defaultValue={newPass.password1}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              className={styles.textField}
              placeholder="Пароль"
              name="password2"
              type="password"
              inputProps={{
                style: {
                  fontFamily: 'Ysabeau Infant',
                },
              }}
              defaultValue={newPass.password2}
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
              onClick={handleUpdPass}
            >
              Сохранить
            </Button>
          </form>
        )}
      </div>
    </>
  );
}
