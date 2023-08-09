const { Collection } = require('../../../db/models');

module.exports.readCollection = async (req, res) => {
  try {
    const allcollection = await Collection.findAll({ raw: true });
    res.status(200).json({ message: 'success', allcollection });
  } catch (err) {
    res.status(400).json({ message: 'error' });
    console.log('Ошибка в readcollection --->', err);
  }
};

module.exports.addCollection = async (req, res) => {
  try {
    const { files } = req;
    const { name } = JSON.parse(req.body.description);
    const collection = await Collection.create({
      name,
      photo: files[0].filename,
    });
    const resultCollection = collection.get({ plain: true });
    res.status(200).json({ message: 'Коллекция добавлена' });
  } catch (err) {
    res.status(400).json({ message: 'Не удалось добавить коллекцию' });
    console.log('Ошибка в addCollection --->', err);
  }
};
