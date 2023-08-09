const { Item, Photo } = require('../../db/models');

module.exports.getStock = async (req, res) => {
  try {
    const inStockItems = await Item.findAll({
      where: { in_stock: true },
      include: [
        {
          model: Photo,
          limit: 1,
        },
      ],
    });
    res.json(inStockItems);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};
