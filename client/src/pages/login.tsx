import React, { ChangeEvent, MouseEvent, useState } from 'react';
import styles from '../styles/Auth.module.css';
import { TextField, Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { signInUserThunk } from '../app/thunkActionsAuth';
import Link from 'next/link';

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const error = useSelector((state) => state.sessionSlice.error);

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
          if (router.asPath === '/cart') {
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
      <div className={styles.formContainer}>
        <form className={styles.signInForm}>
          <Typography variant="h3" align="center" className={styles.header}>
            Войдите в аккаунт
            {errorMsg && <p>{error}</p>}
            <TextField
              className={styles.textField}
              placeholder="Email"
              name="email"
              type="email"
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
              <Link href="/register" className="redirect">
                Создайте аккаунт
              </Link>
            </p>
          </Typography>
        </form>
      </div>
    </>
  );
}
