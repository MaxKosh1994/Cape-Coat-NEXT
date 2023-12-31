module.exports.isAuth = (req, res, next) => {
  const { user } = req.session;
  if (user) {
    next();
  } else {
    res.status(401).json({ message: 'Не авторизован' });
  }
};

module.exports.isAdmin = (req, res, next) => {
  const { isAdmin } = req.session;
  if (isAdmin) {
    next();
  } else {
    res.status(401).json({ message: 'Нет прав администратора' });
  }
};
