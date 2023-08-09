const { Category } = require('../../../db/models');

module.exports.readCategory = async (req, res) => {
  try {
    const allCategory = await Category.findAll({ raw: true });
    res.status(200).json({ message: 'success', allCategory });
  } catch (err) {
    res.status(400).json({ message: 'error' });
    console.log('Ошибка в readCategory --->', err);
  }
};

module.exports.addCategory = async (req, res) => {
  try {
    const { files } = req;
    const { name } = JSON.parse(req.body.description);
    const category = await Category.create({ name, photo: files[0].filename });
    const resultItem = category.get({ plain: true });
    res.status(200).json({ message: 'Категория добавлена' });
  } catch (err) {
    res.status(400).json({ message: 'Не удалось добавить категорию' });
    console.log('Ошибка в addCategory --->', err);
  }
};
