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
        measurements: `Рост: ${oneItem.Carts.map(
          (item) => item.CartItem.height,
        )}см, длина изделия: ${oneItem.Carts.map(
          (item) => item.CartItem.length,
        )}см, длина рукава: ${oneItem.Carts.map(
          (item) => item.CartItem.sleeve,
        )}см, объем груди: ${oneItem.Carts.map(
          (item) => item.CartItem.bust,
        )}см, объем талии: ${oneItem.Carts.map(
          (item) => item.CartItem.waist,
        )}см, объем бедер: ${oneItem.Carts.map(
          (item) => item.CartItem.hips,
        )}см, седло: ${oneItem.Carts.map(
          (item) => item.CartItem.saddle,
        )}, пуговицы: ${oneItem.Carts.map(
          (item) => item.CartItem.buttons,
        )}, утепление: ${oneItem.Carts.map((item) => item.CartItem.lining)}`,
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
