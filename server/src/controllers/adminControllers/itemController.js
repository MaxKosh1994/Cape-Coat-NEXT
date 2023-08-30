const { Item, Photo } = require('../../../db/models');

module.exports.readItem = async (req, res) => {
  try {
    const allItem = await Item.findAll({
      include: [Photo],
    });
    res.status(200).json({ message: 'success', all: allItem });
  } catch (err) {
    res.status(400).json({ message: 'error' });
    console.log('Ошибка в readItem --->', err);
  }
};

module.exports.addItem = async (req, res) => {
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
      material_id
    } = JSON.parse(req.body.description);
    console.log(JSON.parse(req.body.description))

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
      material_id
    });
    

    const resultItem = item.get({ plain: true });
    console.log(resultItem)
    await files.map((el) => {
      Photo.create({ photo: el.filename, item_id: resultItem.id });
    });
    res.status(200).json({ message: 'Товар успешно добавлен' });
  } catch (err) {
    res.status(400).json({ message: 'error' });
    console.log('Ошибка в addItem --->', err);
  }
};



module.exports.delItem = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const item = await Item.destroy({
      where: { id },
      individualHooks: true,
    });
    res.status(200).json({ message: 'Товар удален' });
  } catch (err) {
    res.status(400).json({ message: 'Не удалось удалить товар' });
    console.log('Ошибка в delItem --->', err);
  }
};

module.exports.editItem = async (req, res) => {
  try {
    const { files } = req;
    let photo = files[0]?.filename;
    let { name, urlName, item_id } = JSON.parse(req.body.description);
    const [rowsAffected, [updatedItem]] = await Item.update(
      { name, urlName, photo },
      { where: { id: item_id }, individualHooks: true },
    );
    const result = updatedItem.dataValues;
    res.status(200).json({
      message: 'Товар изменен',
      res: result,
    });
  } catch (err) {
    res.status(400).json({ message: 'Не удалось изменить товар' });
    console.log('Ошибка в editItem --->', err);
  }
};