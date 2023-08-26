const { Item, Order, User, OrderItem } = require('../../../db/models');

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

module.exports.updateOrderItemField = async (req, res) => {
  try {
    const updateField = await req.body;
    const orderId = await req.params.id;
    const itemId = await req.params.itemId;

    console.log(req.body, orderId, itemId);

    const orderItem = await OrderItem.findOne({
      where: {
        order_id: orderId,
        item_id: itemId,
      },
    });

    console.log(orderItem);

    if (!orderItem) {
      res.status(404).json({ message: 'Не найдено OrderItem для обновления' });
      return;
    }

    if (updateField === 'loops') {
      await orderItem.update({ loops: !orderItem.loops });
    }

    await orderItem.update(updateField);

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
