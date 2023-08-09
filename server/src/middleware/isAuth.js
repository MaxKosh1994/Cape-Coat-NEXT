module.exports.isAuth = (req, res, next) => {
  const user = req.session;
  if (user) {
    next();
  } else {
    res.status(401).json({ message: 'Не авторизован' });
  }
};
