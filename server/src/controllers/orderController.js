const { Item, Order, User, OrderItem } = require('../../db/models');

module.exports.createOrder = async (req, res) => {
  try {
    const currUser = await User.findOne({ where: { email: req.body.user } });
    const newOrder = await Order.create(
      {
        user_id: currUser.id,
        address: req.body.addressString,
        total: req.body.cartTotal,
        comments: req.body.commentsInput,
      },
      { raw: true },
    );
    // TODO чтобы не создать заказ два раза одинаковый ?
    // если на 6 строке заменить на findOrCreate
    // и поиск по user_id то нельзя будет сделать второй заказ
    if (newOrder) {
      const orderItemsData = req.body.cartItemsList.map((cartItem) => ({
        item_id: cartItem.id,
        order_id: newOrder.id,
      }));

      await OrderItem.bulkCreate(orderItemsData);

      res.json({
        success: true,
        message: `Заказ номер ${newOrder.id} создан. Мы свяжемся с вами в течение дня.`,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Не получилось создать заказ. Пожалуйста, попробуйте позже',
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте позже' });
  }
};
