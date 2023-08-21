import React, { ChangeEvent, MouseEvent, useState } from 'react';
import styles from '../styles/Auth.module.css';
import { TextField, Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { signInUserThunk } from '../app/thunkActionsAuth';
import Link from 'next/link';
import Head from 'next/head';

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const error = useSelector((state) => state.sessionSlice.error);
  const user = useSelector((state) => state.sessionSlice.user);

  const [errorMsg, setErrorMsg] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSignIn = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (formData.email && formData.password) {
      const resp = await dispatch(signInUserThunk(formData));
      if (resp.message) {
        setErrorMsg(resp.response.data.message);
      } else {
        if (resp.isAdmin) {
          router.push('/admin/orders');
        } else {
          // TODO временный костыль чтобы открывалась корзина на логине
          if (user) {
            router.push('/cart');
          } else {
            router.back();
          }
        }
      }
    }
  };

  return (
    <>
      <Head>
        <title>Cape&Coat | Вход</title>
        <meta name="title" content="Cape and Coat" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.formContainer}>
        <form className={styles.signInForm}>
          <h3 className={styles.header}>Войдите в аккаунт</h3>
          {errorMsg && <p>{error}</p>}
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
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            className={styles.textField}
            placeholder="Пароль"
            name="password"
            type="password"
            inputProps={{
              style: {
                fontFamily: 'Ysabeau Infant',
              },
            }}
            value={formData.password}
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
            }}
            onClick={handleSignIn}
          >
            Войти
          </Button>
          <p className={styles.redirMsg}>
            Еще не зарегистрированы?{' '}
            <Link href="/signup" className={styles.redirect}>
              Создайте аккаунт
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}
