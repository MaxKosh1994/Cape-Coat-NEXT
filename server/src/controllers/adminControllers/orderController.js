const { Item, Order, User } = require('../../../db/models');

module.exports.readOrder = async (req, res) => {
  try {
    const allOrder = await Order.findAll({
      include: [{ model: User }, { model: Item }],
      nest: true,
    });
    res.status(200).json({ allOrder, message: 'success' });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'error' });
  }
};

module.exports.updateOrderField = async (req, res) => {
  try {
    const updateField = await req.body;
    const orderId = await req.params.id;

    await Order.update(updateField, { where: { id: orderId } });

    const updatedOrder = await Order.findOne({
      where: { id: orderId },
      include: [{ model: User }, { model: Item }],
      nest: true,
    });

    if (updatedOrder) {
      res.status(200).json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Не удалось найти обновленный заказ' });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Ошибка на сервере' });
  }
};
