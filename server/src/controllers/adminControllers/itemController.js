const { Item, Photo, Material, Category } = require('../../../db/models');
const fs = require('fs').promises;

module.exports.addItem = async (req, res) => {
  try {
    const { files } = req;
    const {
      nameModel,
      description,
      model_sizes,
      care_instructions,
      characteristics,
      price,
      color,
      in_stock,
      collection_id,
      category_id,
    } = JSON.parse(req.body.description);

    const item = await Item.create({
      name: nameModel,
      description,
      model_sizes,
      care_instructions,
      characteristics,
      price: Number(price),
      color,
      in_stock,
      collection_id: Number(collection_id),
      category_id: Number(category_id),
    });

    const resultItem = item.get({ plain: true });
    await files.map((el) => {
      Photo.create({ photo: el.filename, item_id: resultItem.id });
    });
    res.status(200).json({ message: 'Товар успешно добавлен' });
  } catch (err) {
    res.status(400).json({ message: 'error' });
    console.log('Ошибка в addItem --->', err);
  }
};

module.exports.readItem = async (req, res) => {
  try {
    const readItem = await Item.findAll({
      include: [Photo],
    });
    res.status(200).json({ message: 'success', readItem });
  } catch (err) {
    res.status(400).json({ message: 'error' });
    console.log('Ошибка в readItem --->', err);
  }
};

module.exports.delItem = async (req, res) => {
  try {
  } catch (err) {
    res.status(400).json({ message: 'error' });
    console.log('Ошибка в delItem --->', err);
  }
};

module.exports.getAllMaterials = async (req, res) => {
  const { id: itemId } = req.params;
  try {
    const item = await Item.findByPk(itemId);

    if (!item) {
      return res.status(404).json({ message: 'Товар не найден' });
    }

    const category = await Category.findByPk(item.category_id);

    if (!category) {
      return res.status(404).json({ message: 'Категория не найдена' });
    }

    const materials = await Material.findAll({
      where: { category_id: category.id },
      raw: true,
    });

    return res.status(200).json({ materials });
  } catch (err) {
    res.status(400).json({ message: 'Ошибка' });
    console.log('Ошибка в getAllMaterials --->', err);
  }
};
