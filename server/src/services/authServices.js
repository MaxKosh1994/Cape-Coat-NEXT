const bcrypt = require('bcrypt');
const { User } = require('../../db/models');
const { findUserByEmail, findOrCreateUserByEmail } = require('./userService');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

module.exports.registerUser = async (full_name, email, phone, password) => {
  try {
    if (!full_name || !email || !phone || !password) {
      return { success: false, message: 'Некорректные данные!' };
    }
    if (!emailRegex.test(email)) {
      return { success: false, message: 'Некорректный формат email' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const [userData, isCreated] = await findOrCreateUserByEmail(
      full_name,
      email,
      phone,
      hashedPassword,
    );
    if (isCreated) {
      return { success: true, userData };
    }
    return {
      success: false,
      message: 'Пользователь с таким email уже существует',
    };
  } catch (err) {
    throw new Error('Ошибка сервера');
  }
};

module.exports.loginUser = async (email, password) => {
  try {
    if (!emailRegex.test(email)) {
      return { success: false, message: 'Некорректный формат email' };
    }
    const currentUser = await findUserByEmail(email);

    if (!currentUser) {
      return { success: false, message: 'Такого пользователя не существует' };
    }

    const passwordCheck = await bcrypt.compare(password, currentUser.password);

    if (!passwordCheck) {
      return { success: false, message: 'Неверный пароль' };
    }

    return {
      success: true,
      email: currentUser.email,
      name: currentUser.full_name,
      isAdmin: currentUser.admin,
    };
  } catch (err) {
    throw new Error('Ошибка сервера');
  }
};

module.exports.checkSession = async (session) => {
  try {
    const email = session?.user;

    if (email) {
      const currentUser = await findUserByEmail(email);

      return {
        isLogin: true,
        user: email,
        isAdmin: currentUser.admin,
      };
    }
    return { isLogin: false };
  } catch (err) {
    throw new Error('Ошибка сервера');
  }
};
