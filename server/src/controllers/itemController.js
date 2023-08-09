const { Item, User, Favorite, Photo, Material } = require('../../db/models');

module.exports.oneItem = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Item.findOne({
      where: { id },

      include: [Photo],
    });
    const item = data.get({ plain: true });
    const materials = await Material.findAll({
      where: { category_id: item.category_id },
      raw: true,
    });

    if (item && materials) {
      res.status(200).json({ item, materials });
    } else {
      res.status(404).json('Нет такого товара');
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

module.exports.addFavourites = async (req, res) => {
  try {
    const email = req?.session?.user;
    const { id } = req.params;

    if (email) {
      const user = await User.findOne({
        where: { email },
        raw: true,
      });

      const favCheck = await Favorite.findOne({
        where: {
          user_id: user.id,
          item_id: id,
        },
        raw: true,
      });

      if (favCheck) {
        await Favorite.destroy({
          where: {
            user_id: user.id,
            item_id: id,
          },
        });

        const updatedFav = await Favorite.findAll({
          where: {
            user_id: user.id,
          },
          raw: true,
        });

        res.status(200).json(updatedFav);
      } else {
        await Favorite.create({
          user_id: user.id,
          item_id: id,
        });

        const updatedFav = await Favorite.findAll({
          where: {
            user_id: user.id,
          },
          raw: true,
        });

        res.status(200).json(updatedFav);
      }
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

module.exports.favourites = async (req, res) => {
  try {
    const email = req?.session?.user;
    const { id } = req.params;
    if (email) {
      const user = await User.findOne({
        where: { email },
        raw: true,
      });

      const favourites = await Favorite.findAll({
        where: { user_id: user.id },
        raw: true,
      });

      if (favourites && favourites.length > 0) {
        res.status(200).json({ isLiked: true, favourites });
      } else {
        res.status(200).json({ isLiked: false, favourites: [] });
      }
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

module.exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.findAll({
      include: [
        {
          model: Photo,
          limit: 1,
        },
      ],
    });
    if (items) {
      res.status(200).json(items);
    } else {
      res
        .status(404)
        .json({ message: 'Извините, сервер временно не хочет грузить товары' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

module.exports.getAllItemsWithFavorites = async (req, res) => {
  try {
    const email = req?.session?.user;

    if (email) {
      const user = await User.findOne({
        where: { email },
        raw: true,
      });

      const favourites = await Favorite.findAll({
        where: { user_id: user.id },
        raw: true,
      });

      if (favourites.length === 0) {
        return res.status(200).json({ isLiked: false, favourites: [] });
      }

      const favoriteItemIds = favourites.map((fav) => fav.item_id);

      const items = await Item.findAll({
        where: { id: favoriteItemIds },
        include: [{ model: Photo, limit: 1 }],
      });

      console.log(items);

      res.status(200).json(items);
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};
