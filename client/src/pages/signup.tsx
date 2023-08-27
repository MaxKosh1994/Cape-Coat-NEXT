import React, { ChangeEvent, MouseEvent, useState } from 'react';
import styles from '../styles/Auth.module.css';
import { TextField, Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { ISignUpInputs } from '@/TypeScript/authTypes';
import { signUpUserThunk } from '../app/thunkActionsAuth';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function SignUp() {
  const error = useAppSelector((state) => state.sessionSlice.error);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [formData, setFormData] = useState<ISignUpInputs>({
    full_name: '',
    email: '',
    password: '',
  });
  const [errorMsg, setErrorMsg] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //TODO в функцию ввести свой token и почту, с которой будем отправлять сообщение (https://www.youtube.com/watch?v=yP85ECOVMe8)

  function sendMail(full_name: string, email: string) {
    Email.send({
      SecureToken: 'ef79f30f-8ef6-4205-979a-b8e46f36a527',
      To: email,
      From: 'maxkosh1994@gmail.com',
      Subject: 'Сообщение от команды Cape&Coat',
      Body: `Уважаемый(ая) ${full_name}, вы указали этот почтовый ящик (${email}) при регистрации на сайте Cape&Coat. Добро пожаловать и желаем вам приятно провести время на нашем сайте! С уважением, команда Cape&Coat!`,
    });
  }

  const handleSignUp = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (formData.full_name && formData.email && formData.password) {
      const resp = await dispatch(signUpUserThunk(formData));
      if (resp?.response?.data?.message) {
        setErrorMsg(resp.response.data.message);
      } else {
        router.push('/');
        sendMail(formData.full_name, formData.email);
      }
    }
  };

  return (
    <>
      <Head>
        <title>Cape&Coat | Регистрация</title>
        <meta name="title" content="Cape and Coat" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.formContainer}>
        <form className={styles.signInForm}>
          <h3 className={styles.header}>Создайте аккаунт</h3>
          {errorMsg && <p>{error}</p>}
          <TextField
            className={styles.textField}
            placeholder="Имя и фамилия"
            name="full_name"
            inputProps={{
              style: {
                fontFamily: 'Ysabeau Infant',
              },
            }}
            value={formData.full_name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
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
            variant="text"
            color="primary"
            style={{
              backgroundColor: 'black',
              color: 'white',
            }}
            onClick={handleSignUp}
          >
            Зарегистрироваться
          </Button>
          <p className={styles.redirMsg}>
            Уже зарегистрированы?{' '}
            <Link href="/signin" className={styles.redirect}>
              Войдите в аккаунт
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}
