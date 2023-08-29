const {
  Item,
  Order,
  User,
  OrderItem,
  Material,
} = require('../../../db/models');

module.exports.readOrder = async (req, res) => {
  try {
    const allOrder = await Order.findAll({
      include: [{ model: User }, { model: Item, include: { model: Material } }],
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

// personalData,
// cartTotal,
// addressString,
// commentsInput,
// urgentMaking,
// userParams

module.exports.createOrder = async (req, res) => {
  try {
    let currUser;

    const {
      personalData,
      cartTotal,
      addressString,
      commentsInput,
      urgentMaking,
      userParams,
    } = req.body;

    console.log(
      'Данные пользователя ====>>> \n',
      personalData,
      'Cумма заказа ====>>> \n',
      cartTotal,
      'Адрес ====>>> \n',
      addressString,
      'Комментарии ====>>> \n',
      commentsInput,
      'Срочность ====>>> \n',
      urgentMaking,
      'Товары и мерки ====>>> \n',
      userParams,
    );

    if (personalData) {
      currUser = await User.findOne({
        where: { email: personalData.email },
      });

      if (!currUser) {
        const createdUser = await User.create({
          email: personalData.email,
          full_name: personalData.name,
          phone: personalData.number,
          telegram_instagram: personalData.telegram_instagram,
          password: 'yourDefaultPassword',
        });
        currUser = createdUser.get();
      }
    }

    const newOrder = await Order.create(
      {
        user_id: currUser.id,
        address: addressString,
        total: cartTotal,
        comments: commentsInput,
        urgent: urgentMaking,
      },
      { raw: true },
    );

    if (newOrder) {
      const userParamsArray = Object.entries(userParams);

      const orderItemsData = userParamsArray.map(([itemId, oneItem]) => ({
        item_id: itemId,
        order_id: newOrder.id,
        height: oneItem.height?.toString(),
        length: oneItem.length?.toString(),
        sleeve: oneItem.sleeve?.toString(),
        bust: oneItem.bust?.toString(),
        waist: oneItem.waist?.toString(),
        hips: oneItem.hips?.toString(),
        saddle: oneItem.saddle?.toString(),
        loops: Boolean(oneItem.loops),
        buttons: oneItem.buttons?.toString(),
        lining: oneItem.lining?.toString(),
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
