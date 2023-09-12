const nodemailer = require('nodemailer');
const {
  registerUser,
  loginUser,
  checkSession,
  generateToken,
  validateToken,
  deleteToken,
} = require('../services/authServices');
const { updUserPass } = require('../services/userService');

module.exports.register = async (req, res) => {
  try {
    const { full_name, email, phone, password } = req.body;

    const registrationResult = await registerUser(
      full_name,
      email,
      phone,
      password,
    );

    if (!registrationResult.success) {
      return res.status(401).json({ message: registrationResult.message });
    }
    req.session.user = registrationResult.userData.email;
    req.session.isAdmin = registrationResult.userData.isAdmin;
    req.session.save();
    res.json(registrationResult.userData.email);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const loginResult = await loginUser(email, password);

    if (!loginResult.success) {
      return res.status(401).json({ message: loginResult.message });
    }

    req.session.user = loginResult.email;
    req.session.isAdmin = loginResult.isAdmin;
    req.session.save();

    res.json({
      email: loginResult.email,
      name: loginResult.name,
      isAdmin: loginResult.isAdmin,
    });
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

module.exports.forgotPass = async (req, res) => {
  try {
    const { email } = req.body;
    const token = await generateToken(email);
    if (token !== '') {
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
          user: process.env.NODEMAILER_EMAIL,
          pass: 'dzfe wzzk dkln smoj',
        },
      });
      const resetLink = `localhost:3000/reset-pass/${token}`;
      const mailOptions = {
        from: `CapeNCoat <${process.env.NODEMAILER_EMAIL}>`,
        to: 'sashainiesta@gmail.com',
        subject: 'Сброс пароля на CapeNCoat',
        text: `Перейдите по ссылке чтобы установить новый пароль: ${resetLink}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          res.status(500).json({ message: 'Не удалось отправить ссылку' });
        } else {
          res.status(200).json({
            message: 'Ссылка для сброса пароля отправлена вам на почту',
          });
        }
      });
    } else {
      res.status(401).json({ message: 'Такой пользователь не найден' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

module.exports.resetPass = async (req, res) => {
  try {
    const { token, password } = req.body;
    const isTokenValid = await validateToken(token);
    if (isTokenValid.success) {
      const wasPassUpdated = await updUserPass(isTokenValid.user, password);
      if (wasPassUpdated.success) {
        res.status(200).json(wasPassUpdated);
        // await deleteToken(token);
      } else {
        res.status(500).json(wasPassUpdated);
      }
    } else {
      res
        .status(401)
        .json({ message: 'Отправьте новый запрос о сбросе пароля' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Отправьте новый запрос о сбросе пароля' });
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
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

module.exports.session = async (req, res) => {
  try {
    const sessionResult = await checkSession(req.session);

    if (sessionResult.isLogin) {
      res.status(200).json({
        isLogin: true,
        user: sessionResult.user,
        isAdmin: sessionResult.isAdmin,
      });
    } else {
      res.status(200).json({ isLogin: false });
    }
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};
