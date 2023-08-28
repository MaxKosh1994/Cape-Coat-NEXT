const { Order, User, OrderItem } = require('../../db/models');
const { getItemsInUserCart } = require('../services/cartItemService');
const { checkUserUsedPromocode } = require('../services/cartServices');

module.exports.createOrder = async (req, res) => {
  try {
    let currUser;
    if (req.body.user) {
      currUser = await User.findOne({ where: { email: req.body.user } });
    } else if (req.body.personalData) {
      const { personalData } = req.body;
      const newUser = await User.create({
        email: personalData.email,
        full_name: personalData.name,
        phone: personalData.phone,
        password: 'zhopablya',
      });
      currUser = newUser.get();
    }
    const newOrder = await Order.create(
      {
        user_id: currUser.id,
        address: req.body.addressString,
        total: req.body.cartTotal,
        comments: req.body.commentsInput,
        urgent: req.body.urgentMaking,
      },
      { raw: true },
    );
    // TODO исправить после введения рабочего локалсторедж
    const cartItems = await getItemsInUserCart(currUser.id);
    if (newOrder) {
      const orderItemsData = cartItems.map((oneItem) => ({
        item_id: oneItem.item_id,
        order_id: newOrder.id,
        height: oneItem.height.toString(),
        length: oneItem.length.toString(),
        sleeve: oneItem.sleeve.toString(),
        bust: oneItem.bust.toString(),
        waist: oneItem.waist.toString(),
        hips: oneItem.hips.toString(),
        saddle: oneItem.saddle.toString(),
        loops: Boolean(oneItem.loops),
        buttons: oneItem.buttons.toString(),
        lining: oneItem.lining.toString(),
      }));

      await OrderItem.bulkCreate(orderItemsData);

      if (req.body.dbPc) {
        const usedPCCheck = await checkUserUsedPromocode(
          req.body.dbPc,
          currUser.email,
        );
        if (usedPCCheck.success) {
          res.json({
            success: true,
            message: `Заказ номер ${newOrder.id} создан. Мы свяжемся с вами в течение дня.`,
          });
        } else {
          res.json({
            success: false,
            message: usedPCCheck.message,
          });
        }
      } else {
        res.json({
          success: true,
          message: `Заказ номер ${newOrder.id} создан. Мы свяжемся с вами в течение дня.`,
        });
      }
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
