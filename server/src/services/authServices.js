const bcrypt = require('bcrypt');
const { User, Token } = require('../../db/models');
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

module.exports.generateToken = async (email) => {
  const token = await bcrypt.hash(Date.now().toString(), 10);
  const currUser = await findUserByEmail(email);
  if (!currUser) {
    return '';
  }
  await Token.create({
    resetToken: token,
    user_id: currUser.id,
  });
  return token;
};

module.exports.validateToken = async (token) => {
  const tokenRecord = await Token.findOne({
    where: { resetToken: token },
    include: {
      model: User,
      attributes: ['email'],
    },
    raw: true,
    nest: true,
  });
  const user = tokenRecord.User.email;
  const currentDateTime = new Date();
  if (!tokenRecord || tokenRecord.expirationDate > currentDateTime) {
    return { success: false, message: 'Истек срок токена' };
  }
  return { success: true, user };
};

module.exports.deleteToken = async (resetToken) => {
  await Token.destroy({ where: { resetToken } });
};
