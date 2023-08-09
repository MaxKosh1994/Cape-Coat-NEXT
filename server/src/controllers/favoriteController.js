const { Favorite, User } = require('../../db/models');

module.exports.findAllFavCard = async (req, res) => {
  try {
    const { user } = req.session;
    const userId = await User.findOne({
      where: {
        email: user,
      },
      raw: true,
    });

    if (!userId) {
      res.status(404).json({ message: 'Пользователь не найден' });
    }

    const favorites = await Favorite.findAll({
      where: {
        user_id: userId.id,
      },
      attributes: ['item_id'],
      raw: true,
    });

    const favoriteItems = favorites.map((favorite) => favorite.item_id);

    if (!favorites || !favoriteItems) {
      res.status(403).json({ message: 'У вас пока нет товаров в избранном' });
    }

    res.status(200).json(favoriteItems);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

module.exports.addFavorite = async (req, res) => {
  try {
    const { user } = req.session;
    const favCard = req.body;

    const userId = await User.findOne({
      where: {
        email: user,
      },
      raw: true,
    });

    const favCardAdd = await Favorite.findOrCreate({
      where: {
        user_id: userId.id,
        item_id: favCard.id,
      },
      raw: true,
      nest: true,
    });

    if (favCardAdd) {
      res.status(200).json(favCardAdd);
    } else {
      res.status(404);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

module.exports.delFavorite = async (req, res) => {
  try {
    const { user } = req.session;
    const delCard = req.body;

    const userId = await User.findOne({
      where: {
        email: user,
      },
      raw: true,
      nest: true,
    });

    const favCardDel = await Favorite.findOne({
      where: {
        user_id: userId.id,
        item_id: delCard.id,
      },
    });

    if (favCardDel) {
      const deletedItemId = favCardDel.item_id; // Сохраняем идентификатор удаленного элемента

      await favCardDel.destroy(); // Удаляем запись
      res.status(200).json({ item_id: deletedItemId });
    } else {
      res.status(404);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};
