const { Op } = require('sequelize');
const {
  Item,
  User,
  Favorite,
  Photo,
  Material,
  Category,
} = require('../../db/models');

module.exports.oneItem = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Item.findOne({
      where: { id },

      include: [
        {
          model: Photo,
        },
        {
          model: Material,
        },
        {
          model: Category,
        },
      ],
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

module.exports.findItemsById = async (req, res) => {
  try {
    const requestData = req.body;
    const ids = requestData.map((item) => item.id);

    const items = await Item.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      include: [
        {
          model: Photo,
          limit: 1,
        },
        {
          model: Material,
        },
        {
          model: Category,
        },
      ],
    });

    const materialNamesById = {};
    requestData.forEach((item) => {
      materialNamesById[item.id] = item.material_name;
    });

    const itemsWithMaterialName = items.map((item) => ({
      ...item.toJSON(),
      selected_material: materialNamesById[item.id],
    }));
    res.json(itemsWithMaterialName);
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
    const { email } = req.params;
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
      where: { purchased: false },
      include: [
        {
          model: Photo,
          limit: 1,
        },
        {
          model: Category,
        },
        {
          model: Material,
        },
      ],
    });
    if (items) {
      res.status(200).json(items);
    } else {
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  } catch (err) {
    console.log(err);
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
        include: [
          {
            model: Photo,
            limit: 1,
          },
          {
            model: Category,
          },
          {
            model: Material,
          },
        ],
      });

      res.status(200).json(items);
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};
