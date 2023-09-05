const { User, Order, Photo, Item } = require('../../db/models');

module.exports.getProfileInfo = async (req, res) => {
  try {
    const { user } = req.session;
    const userExisting = await User.findOne({ where: { email: user } });

    if (!userExisting) {
      res
        .status(403)
        .json({ message: 'Произошла ошибка при поиске пользователя' });
    }

    if (userExisting) {
      res.status(200).json(userExisting);
    }
  } catch (err) {
    res.status(500).json({ error: 'Ошибка на сервере' });
    console.log('Ошибка в getProfileInfo --->', err);
  }
};

module.exports.getAllOrders = async (req, res) => {
  try {
    const { user } = req.session;
    const userExisting = await User.findOne({ where: { email: user } });

    if (!userExisting) {
      return res
        .status(403)
        .json({ message: 'Произошла ошибка при поиске пользователя' });
    }

    const orders = await Order.findAll({
      where: { user_id: userExisting.id },
      include: [
        {
          model: Item,
          include: [{ model: Photo, limit: 1 }],
        },
      ],
    });

    if (!orders) {
      return res
        .status(402)
        .json({ message: 'Произошла ошибка при поиске заказов пользователя' });
    }

    const formattedOrders = orders.map((order) => {
      const formattedOrder = {
        id: order.id,
        user_id: order.user_id,
        total: order.total,
        status: order.status,
        address: order.address,
        comments: order.comments,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
        Items: order.Items,
      };

      return formattedOrder;
    });

    if (formattedOrders.length > 0) {
      return res.status(200).json(formattedOrders);
    }
    return res.status(203).json({ message: 'У вас пока нет заказов' });
  } catch (err) {
    console.log('Ошибка в getAllOrders --->', err);
    return res.status(500).json({ error: 'Ошибка на сервере' });
  }
};

module.exports.updateInfo = async (req, res) => {
  try {
    const { user } = req.session;
    const { full_name, address, phone, telegram_instagram } = req.body;

    if (!full_name) {
      return res
        .status(403)
        .json({ message: 'Пожалуйста, заполните все обязательные поля' });
    }

    const userExisting = await User.findOne({ where: { email: user } });

    if (!userExisting) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    if (full_name) {
      userExisting.full_name = full_name;
    }
    if (address) {
      userExisting.address = address;
    }
    if (phone) {
      userExisting.phone = phone;
    }
    if (telegram_instagram) {
      userExisting.telegram_instagram = telegram_instagram;
    }

    await userExisting.save();

    res.status(200).json({ message: 'Данные успешно обновлены' });
  } catch (err) {
    console.log('Ошибка в updateInfo --->', err);
    return res.status(500).json({ message: 'Произошла ошибка' });
  }
};
