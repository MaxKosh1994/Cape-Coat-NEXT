const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const { Category, Item, Photo } = require('../../db/models');

module.exports.oneCategory = async (req, res) => {
  try {
    const { urlName } = req.params;
    const category = await Category.findAll({
      where: {
        urlName, // Shorthand property name, equivalent to { id: id }
      },
      include: [
        {
          model: Item,
          where: { in_stock: false }, // Filter items that are in stock
          include: [
            {
              model: Photo,
              limit: 1,
            },
          ],
        },
      ],
    });

    if (category && category.length > 0) {
      res
        .status(200)
        .json({ items: category[0].Items, catName: category[0].name });
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (err) {
    console.log(res);
    res.status(500).json({ message: 'Server Error' });
  }
};
