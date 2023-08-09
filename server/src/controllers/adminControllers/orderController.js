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

module.exports.updateOrder = async (req, res) => {
  try {
    const orderStatus = await req.body.status;
    const orderId = await req.params.id;
    console.log(orderId, orderStatus);
    const updateOrderStatus = await Order.update(
      { status: orderStatus },
      { where: { id: orderId } },
    );
    res.status(200).json({ message: 'Статус заказа успешно изменён!' });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Ошибка на сервере' });
  }
};
