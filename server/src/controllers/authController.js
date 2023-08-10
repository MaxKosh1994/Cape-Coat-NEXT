const {
  registerUser,
  loginUser,
  checkSession,
} = require('../services/authServices/authServices'); // Import the userService module

module.exports.register = async (req, res) => {
  try {
    const { full_name, email, password } = req.body;

    const registrationResult = await registerUser(full_name, email, password);

    if (!registrationResult.success) {
      return res.status(401).json({ message: registrationResult.message });
    }

    req.session.user = registrationResult.userData.email;
    res.json(registrationResult.userData.email);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  const loginResult = await loginUser(email, password);

  if (!loginResult.success) {
    return res.status(401).json({ message: loginResult.message });
  }

  req.session.user = loginResult.email;
  req.session.save();
  res.json({
    email: loginResult.email,
    name: loginResult.name,
    isAdmin: loginResult.isAdmin,
  });
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
