const bcrypt = require('bcrypt');
const { Order, User, OrderItem } = require('../../db/models');
const {
  getItemsInUserCart,
  checkStockItemAsPurchased,
} = require('../services/cartItemService');
const { checkUserUsedPromocode } = require('../services/cartServices');

const { sendMessageToUser } = require('../../telegramBot/bot');
const { findOrCreateUserByEmail } = require('../services/userService');

module.exports.createOrder = async (req, res) => {
  try {
    let currUser;
    if (req.body.user) {
      currUser = await User.findOne({ where: { email: req.body.user } });
    } else if (req.body.personalData) {
      const { personalData } = req.body;
      const hashedPassword = await bcrypt.hash(personalData.password, 10);
      const [userData, newUser] = await findOrCreateUserByEmail(
        personalData.name,
        personalData.email,
        personalData.phone,
        hashedPassword,
      );
      currUser = userData;
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

    if (newOrder) {
      if (req.body.user) {
        const cartItems = await getItemsInUserCart(currUser.id);
        const orderItemsData = cartItems.map((oneItem) => ({
          item_id: oneItem.item_id,
          order_id: newOrder.id,
          selected_material: oneItem.selected_material
            ? oneItem.selected_material.toString()
            : '',
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
            const itemIds = cartItems.map((item) => item.item_id);
            await checkStockItemAsPurchased(itemIds);
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
          const itemIds = cartItems.map((item) => item.item_id);
          await checkStockItemAsPurchased(itemIds);
          res.json({
            success: true,
            message: `Заказ номер ${newOrder.id} создан. Мы свяжемся с вами в течение дня.`,
          });
        }
      } else if (req.body.personalData) {
        const { itemsWithMeasurements } = req.body;
        const orderItemsData = itemsWithMeasurements.map((oneItem) => ({
          item_id: oneItem.id,
          order_id: newOrder.id,
          selected_material: oneItem.material_name
            ? oneItem.material_name.toString()
            : '',
          height: oneItem.height ? oneItem.height.toString() : '',
          length: oneItem.length ? oneItem.length.toString() : '',
          sleeve: oneItem.sleeve ? oneItem.sleeve.toString() : '',
          bust: oneItem.bust ? oneItem.bust.toString() : '',
          waist: oneItem.waist ? oneItem.waist.toString() : '',
          hips: oneItem.hips ? oneItem.hips.toString() : '',
          saddle: oneItem.saddle ? oneItem.saddle.toString() : '',
          loops: Boolean(oneItem.loops),
          buttons: oneItem.buttons ? oneItem.buttons.toString() : '',
          lining: oneItem.lining ? oneItem.lining.toString() : '',
        }));
        await OrderItem.bulkCreate(orderItemsData);

        const itemIds = orderItemsData.map((item) => item.id);
        await checkStockItemAsPurchased(itemIds);
        res.json({
          success: true,
          message: `Заказ номер ${newOrder.id} создан. Мы свяжемся с вами в течение дня.`,
        });
      }

      //! Отправка сообщений для менеджера
      const { MANAGER_TELEGRAM_ID } = process.env;

      const message = `Покупатель ${currUser.full_name} сделал заказ номер ${newOrder.id} на сумму ${newOrder.total}.\n\nПочта: ${currUser.email}\nНомер телефона: ${currUser.phone}\nCоц.сети: ${currUser.telegram_instagram}`;
      await sendMessageToUser(MANAGER_TELEGRAM_ID, message);

      //! ------------------
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
