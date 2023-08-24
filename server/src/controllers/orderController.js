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
    if (newOrder) {
      const orderItemsData = req.body.cartItemsList.map((oneItem) => ({
        item_id: oneItem.id,
        order_id: newOrder.id,
        height: oneItem.Carts.map((item) => item.CartItem.height).toString(),
        length: oneItem.Carts.map((item) => item.CartItem.length).toString(),
        sleeve: oneItem.Carts.map((item) => item.CartItem.sleeve).toString(),
        bust: oneItem.Carts.map((item) => item.CartItem.bust).toString(),
        waist: oneItem.Carts.map((item) => item.CartItem.waist).toString(),
        hips: oneItem.Carts.map((item) => item.CartItem.hips).toString(),
        saddle: oneItem.Carts.map((item) => item.CartItem.saddle).toString(),
        loops: Boolean(oneItem.Carts.map((item) => item.CartItem.loops)),
        buttons: oneItem.Carts.map((item) => item.CartItem.buttons).toString(),
        lining: oneItem.Carts.map((item) => item.CartItem.lining).toString(),
      }));
      // console.log(orderItemsData);
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
