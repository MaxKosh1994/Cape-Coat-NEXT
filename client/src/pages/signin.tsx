import React, { ChangeEvent, MouseEvent, useState } from 'react';
import styles from '../styles/Auth.module.css';
import { TextField, Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useRouter } from 'next/router';
import { signInUserThunk } from '../app/thunkActionsAuth';
import Link from 'next/link';
import Head from 'next/head';
import { ISignInInputs } from '@/TypeScript/authTypes';
import { handleError } from '@/app/sessionSlice';
import { fetchFavouritesData } from '@/app/thunkActionsFavourite';
import { getCartItemsThunk } from '@/app/thunkActionsCart';

export default function SignIn() {
  const error = useAppSelector((state) => state.sessionSlice.error);
  const user = useAppSelector((state) => state.sessionSlice.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [formData, setFormData] = useState<ISignInInputs>({
    email: '',
    password: '',
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSignIn = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (formData.email && formData.password) {
      const resp = await dispatch(signInUserThunk(formData));
      if (error) {
        setTimeout(() => {
          dispatch(handleError({ message: '' }));
        }, 2000);
      } else {
        if (resp.isAdmin) {
          dispatch(handleError({ message: '' }));
          router.push('/admin/ordersHistory');
        } else {
          if (user) {
            dispatch(handleError({ message: '' }));
            dispatch(fetchFavouritesData());
            dispatch(getCartItemsThunk());
            router.push('/');
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
          {error && <p>{error}</p>}
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
          <div className={styles.redirMsg}>
            <div>
              <Link href="/forgot-pass" className={styles.redirect}>
                Восстановите доступ
              </Link>
            </div>
            <div>или</div>
            <div>
              <Link href="/signup" className={styles.redirect}>
                Создайте аккаунт
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
