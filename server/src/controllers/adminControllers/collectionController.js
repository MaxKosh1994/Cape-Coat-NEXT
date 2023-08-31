const { Collection } = require('../../../db/models');

module.exports.createCollection = async (req, res) => {
  try {
    const { files } = req;
    const photo = files[0]?.filename;
    const { name, description, urlName, current } = JSON.parse(req.body.description);
    const collection = await Collection.create({
      name, photo, description, urlName, current
    });
    const result = collection.get({ plain: true });
    res.status(200).json({ message: 'Коллекция добавлена', res: result });
  } catch (err) {
    res.status(400).json({ message: 'Не удалось добавить коллекцию' });
    console.log('Ошибка в createCollection --->', err);
  }
};

module.exports.readCollection = async (req, res) => {
  try {
    const allcollection = await Collection.findAll({ raw: true });
    res.status(200).json({ message: 'success', res: allcollection });
  } catch (err) {
    res.status(400).json({ message: 'error' });
    console.log('Ошибка в readcollection --->', err);
  }
};

module.exports.updateCollection = async (req, res) => {
  try {
    const { files } = req;
    let photo = files[0]?.filename;
    let { name, description, urlName, current, collection_id } = JSON.parse(req.body.description);
    const [rowsAffected, [updatedCollection]] = await Collection.update(
      { name, photo, description, urlName, current },
      { where: { id: collection_id }, individualHooks: true },
    );
    const result = updatedCollection.dataValues;
    res
      .status(200)
      .json({
        message: 'Коллекция изменена',
        res: result,
      });
  } catch (err) {
    res.status(400).json({ message: 'Не удалось изменить коллекцию' });
    console.log('Ошибка в updateCollection --->', err);
  }
};

module.exports.deleteCollection = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const сollection = await Collection.destroy({
      where: { id },
      individualHooks: true,
    });
    res.status(200).json({ message: 'Коллекция удалена' });
  } catch (err) {
    res.status(400).json({ message: 'Не удалось удалить коллекцию' });
    console.log('Ошибка в deleteCollection --->', err);
  }
};