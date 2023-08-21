const { Item, Order, User } = require('../../../db/models');

module.exports.getALLUsers = async (req, res) => {
  try {
    const allUsers = await User.findAll({
      include: [{ model: Order }],
      nest: true,
    });
    if (!allUsers) {
      res.status(404).json({ message: 'Не удалось загрузить клиентов' });
    }
    res.status(200).json({ allUsers });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'error' });
  }
};
