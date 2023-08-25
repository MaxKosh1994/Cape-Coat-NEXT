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
    await Order.update({ status: orderStatus }, { where: { id: orderId } });

    if (orderStatus === 'Заказ отправлен') {
      await Order.update(
        { getReadyAt: new Date() },
        { where: { id: orderId } },
      );
    }
    res.status(200).json({ message: 'Статус заказа успешно изменён!' });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Ошибка на сервере' });
  }
};

module.exports.updateOrderField = async (req, res) => {
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
};

// module.exports.updateOrderComments = async (req, res) => {
//   const orderComments = await req.body.admin_comments;
//   const orderId = await req.params.id;

//   await Order.update(
//     { admin_comments: orderComments },
//     { where: { id: orderId } },
//   );

//   const updatedOrder = await Order.findOne({
//     where: { id: orderId },
//     include: [{ model: User }, { model: Item }],
//     nest: true,
//   });

//   if (updatedOrder) {
//     res.status(200).json(updatedOrder);
//   } else {
//     res.status(404).json({ message: 'Не удалось найти обновленный заказ' });
//   }
// };

// module.exports.updateOrderPrepayment = async (req, res) => {
//   const orderPrepayment = await req.body.updatedPrepayment;
//   const orderId = await req.params.id;

//   await Order.update(
//     { prepayment: orderPrepayment },
//     { where: { id: orderId } },
//   );

//   const updatedOrder = await Order.findOne({
//     where: { id: orderId },
//     include: [{ model: User }, { model: Item }],
//     nest: true,
//   });

//   if (updatedOrder) {
//     res.status(200).json(updatedOrder);
//   } else {
//     res.status(404).json({ message: 'Не удалось найти обновленный заказ' });
//   }
// };

// module.exports.updateOrderTotal = async (req, res) => {
//   const updatedTotal = await req.body.updatedTotal;
//   const orderId = await req.params.id;

//   await Order.update({ total: updatedTotal }, { where: { id: orderId } });

//   const updatedOrder = await Order.findOne({
//     where: { id: orderId },
//     include: [{ model: User }, { model: Item }],
//     nest: true,
//   });

//   if (updatedOrder) {
//     res.status(200).json(updatedOrder);
//   } else {
//     res.status(404).json({ message: 'Не удалось найти обновленный заказ' });
//   }
// };
