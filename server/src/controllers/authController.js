const bcrypt = require('bcrypt');
const { User } = require('../../db/models');

const emailRegex =
  /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.(?:com|ru|net|org|edu|gov|mil|biz|info|io)$/;

module.exports.register = async (req, res) => {
  try {
    const { full_name, email, password } = req.body;
    if (!full_name || !email || !password) {
      return res.status(401).json({ message: 'Некорректные данные!' });
    }
    if (!emailRegex.test(email)) {
      return res.status(401).json({ message: 'Некорректный формат email' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const isUserExists = await User.findOrCreate({
      where: { email },
      defaults: { full_name, email, password: hashedPassword },
    });
    const [userData, isCreated] = isUserExists;
    if (isCreated) {
      req.session.user = userData.email;
      res.json(userData.email);
    } else {
      res
        .status(401)
        .json({ message: 'Пользователь с таким email уже существует' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!emailRegex.test(email)) {
      return res.status(401).json({ message: 'Некорректный формат email' });
    }
    const currentUser = await User.findOne({ where: { email }, raw: true });
    if (currentUser) {
      const passwordCheck = await bcrypt.compare(
        password,
        currentUser.password,
      );
      if (passwordCheck) {
        req.session.user = currentUser.email;
        req.session.save();
        res.json({
          email: currentUser.email,
          name: currentUser.full_name,
          isAdmin: currentUser.admin,
        });
      } else {
        res.status(401).json({ message: 'Неверный пароль' });
      }
    } else {
      res.status(409).json({ message: 'Такого пользователя не существует' });
    }
  } catch (err) {
    console.log('Ошибка login --->', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

module.exports.logout = (req, res) => {
  try {
    req.session.destroy((error) => {
      if (error) {
        res.status(500).json({ message: 'Ошибка сервера' });
      } else {
        res.clearCookie('connect.sid');
        res.status(200).send();
      }
    });
  } catch (err) {
    console.log('Ошибка в logout --->', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

module.exports.session = async (req, res) => {
  try {
    const email = req.session?.user;

    if (email) {
      const currentUser = await User.findOne({
        where: {
          email,
        },
        raw: true,
      });

      res
        .status(200)
        .json({ isLogin: true, user: email, isAdmin: currentUser.admin });
    } else {
      res.status(200).json({ isLogin: false });
    }
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};
