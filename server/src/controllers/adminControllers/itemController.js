const { Item, Photo } = require('../../../db/models');

module.exports.createItem = async (req, res) => {
  try {
    const { files } = req;
    const {
      name,
      article,
      description,
      model_params,
      characteristics,
      price,
      new_price,
      in_stock,
      bestseller,
      collection_id,
      category_id,
      material_id,
    } = JSON.parse(req.body.description);

    const item = await Item.create({
      name,
      article: Number(article),
      description,
      model_params,
      characteristics,
      price: Number(price),
      new_price: Number(new_price),
      in_stock,
      bestseller,
      collection_id,
      category_id,
      material_id,
    });

    const resultItem = item.get({ plain: true });
    await files.map((el) => {
      Photo.create({ photo: el.filename, item_id: resultItem.id });
    });
    res.status(200).json({ message: 'Товар успешно добавлен' });
  } catch (err) {
    res.status(400).json({ message: 'error' });
    console.log('Ошибка в createItem --->', err);
  }
};

module.exports.readItem = async (req, res) => {
  try {
    const allItem = await Item.findAll({
      include: [Photo],
    });
    res.status(200).json({ message: 'success', res: allItem });
  } catch (err) {
    res.status(400).json({ message: 'error' });
    console.log('Ошибка в readItem --->', err);
  }
};


module.exports.updateItem = async (req, res) => {
  try {
    const { files } = req;
    const {
      name,
      article,
      description,
      model_params,
      characteristics,
      price,
      new_price,
      in_stock,
      bestseller,
      collection_id,
      category_id,
      material_id,
      item_id
    } = JSON.parse(req.body.description);
    const [rowsAffected, [updatedItem]] = await Item.update(
      {
        name,
        article: Number(article),
        description,
        model_params,
        characteristics,
        price: Number(price),
        new_price: Number(new_price),
        in_stock,
        bestseller,
        collection_id,
        category_id,
        material_id,
        item_id,
      },
      { where: { id: item_id } },
    );
    const result = updatedItem.dataValues;
    if (files && files.length > 0) {
      await files.map(async (el) => {
          await Photo.upsert({ photo: el.filename, item_id: item_id }, { individualHooks: true });
        })

    }
    res.status(200).json({
      message: 'Материал изменен',
      res: result,
    });
  } catch (err) {
    res.status(400).json({ message: 'error' });
    console.log('Ошибка в updateItem --->', err);
  }
};

module.exports.deleteItem = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const item = await Item.destroy({
      where: { id },
      individualHooks: true,
    });
    res.status(200).json({ message: 'Товар удален' });
  } catch (err) {
    res.status(400).json({ message: 'error' });
    console.log('Ошибка в deleteItem --->', err);
  }
};
