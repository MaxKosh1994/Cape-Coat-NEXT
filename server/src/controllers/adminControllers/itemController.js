const { Item, Photo } = require('../../../db/models');

module.exports.createItem = async (req, res) => {
  try {
    const { files } = req;
    let {
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
    price ? Number(price) : (price = undefined);
    new_price ? Number(new_price) : (new_price = undefined);
    article ? Number(article) : (article = undefined);

    const item = await Item.create({
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
    });

    const resultItem = item.get({ plain: true });
    await files.map((el) => {
      Photo.create({ photo: el.filename, item_id: resultItem.id });
    });
    res
      .status(200)
      .json({ message: 'Товар успешно добавлен', res: resultItem });
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
    const id = Number(req.params.id);
    let {
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
    price ? Number(price) : (price = undefined);
    new_price ? Number(new_price) : (new_price = undefined);
    article ? Number(article) : (article = undefined);
    const [rowsAffected, [updatedItem]] = await Item.update(
      {
        name,
        article,
        description,
        model_params,
        characteristics,
        price,
        new_price,
        in_stock,
        in_stock,
        bestseller,
        collection_id,
        category_id,
        material_id,
      },
      { where: { id }, individualHooks: true },
    );
    const result = updatedItem.dataValues;
    if (files && files.length > 0) {
      const photo = await Photo.destroy({
        where: { item_id: id },
        individualHooks: true,
      });
      await files.map((el) => {
        Photo.create({ photo: el.filename, item_id: id });
      });
    }
    res.status(200).json({
      message: 'Товар успешно изменен',
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
    const photo = await Photo.destroy({
      where: { item_id: id },
      individualHooks: true,
    });
    const item = await Item.destroy({
      where: { id },
      individualHooks: true,
    });
    console.log(photo);
    res.status(200).json({ message: 'Товар удален' });
  } catch (err) {
    res.status(400).json({ message: 'error' });
    console.log('Ошибка в deleteItem --->', err);
  }
};
