const { Op } = require('sequelize');
const { Category, Item, Collection, Photo } = require('../../db/models');

module.exports.getAll = async (req, res) => {
  try {
    const allCategories = await Category.findAll({ raw: true });
    res.json(allCategories);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

module.exports.getCollection = async (req, res) => {
  try {
    const collectionItems = await Item.findAll({
      where: {
        [Op.and]: [{ collection_id: req.params.id }, { in_stock: false }],
      },
      include: [
        {
          model: Collection,
        },
        {
          model: Photo,
          limit: 1,
        },
      ],
    });
    res.json(collectionItems);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

module.exports.getNewArrivals = async (req, res) => {
  try {
    // TODO какая то автоматизация
    const currDate = new Date('2023-07-11T00:00:00');
    const newArrivals = await Item.findAll({
      where: {
        [Op.and]: [
          { createdAt: { [Op.gt]: currDate.toISOString() } },
          { in_stock: false },
        ],
      },
      include: [
        {
          model: Photo,
          limit: 1,
        },
      ],
    });

    res.json(newArrivals);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};
