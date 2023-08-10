import React, { ChangeEvent, MouseEvent, useState } from 'react';
import styles from '../styles/Auth.module.css';
import { TextField, Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { signUpUserThunk } from '../app/thunkActionsAuth';
import Link from 'next/link';

export default function SignUp() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
  });
  const error = useSelector((state) => state.sessionSlice.error);

  const [errorMsg, setErrorMsg] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  //TODO в функцию ввести свой token и почту, с которой будем отправлять сообщение (https://www.youtube.com/watch?v=yP85ECOVMe8)

  function sendMail(full_name, email) {
    Email.send({
      SecureToken: 'ef79f30f-8ef6-4205-979a-b8e46f36a527',
      To: email,
      From: 'maxkosh1994@gmail.com',
      Subject: 'Сообщение от команды Cape&Coat',
      Body: `Уважаемый(ая) ${full_name}, вы указали этот почтовый ящик (${email}) при регистрации на сайте Cape&Coat. Добро пожаловать и желаем вам приятно провести время на нашем сайте! С уважением, команда Cape&Coat!`,
    });
  }

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (formData.full_name && formData.email && formData.password) {
      console.log(formData);
      const resp = await dispatch(signUpUserThunk(formData));
      if (resp?.response?.data?.message) {
        setErrorMsg(resp.response.data.message);
      } else {
        // TODO определить куда редирект после реги
        window.history.go(-2);
        sendMail(formData.full_name, formData.email);
      }
    }
  };

  return (
    <>
      <div className={styles.formContainer}>
        <form className={styles.signInForm}>
          <Typography variant="h3" textAlign="center" className={styles.header}>
            Создайте аккаунт
            {errorMsg && <p>{error}</p>}
            <TextField
              className={styles.textField}
              label="Имя и фамилия"
              name="full_name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              className={styles.textField}
              label="Email"
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
              label="Пароль"
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
              <Link href="/signin" className="redirect">
                Войдите в аккаунт
              </Link>
            </p>
          </Typography>
        </form>
      </div>
    </>
  );
}
