const { Category } = require('../../../db/models');

module.exports.createCategory = async (req, res) => {
  try {
    const { files } = req;
    const photo = files[0]?.filename;
    const { name, urlName } = JSON.parse(req.body.description);
    const category = await Category.create({ name, urlName, photo });
    const result = category.get({ plain: true });
    res.status(200).json({ message: 'Категория добавлена', res: result });
  } catch (err) {
    res.status(400).json({ message: 'Не удалось добавить категорию' });
    console.log('Ошибка в createCategory --->', err);
  }
};

module.exports.readCategory = async (req, res) => {
  try {
    const allCategory = await Category.findAll({ raw: true });
    res.status(200).json({ message: 'success', res: allCategory });
  } catch (err) {
    res.status(400).json({ message: 'error' });
    console.log('Ошибка в readCategory --->', err);
  }
};

module.exports.updateCategory = async (req, res) => {
  try {
    const { files } = req;
    let photo = files[0]?.filename;
    const id = Number(req.params.id);
    let { name, urlName,  } = JSON.parse(req.body.description);
    const [rowsAffected, [updatedCategory]] = await Category.update(
      { name, urlName, photo },
      { where: { id }, individualHooks: true },
    );
    const result = updatedCategory.dataValues;
    res.status(200).json({
      message: 'Категория изменена',
      res: result,
    });
  } catch (err) {
    res.status(400).json({ message: 'Не удалось изменить категорию' });
    console.log('Ошибка в updateCategory --->', err);
  }
};

module.exports.deleteCategory = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const category = await Category.destroy({
      where: { id },
      individualHooks: true,
    });
    res.status(200).json({ message: 'Категория удалена' });
  } catch (err) {
    res.status(400).json({ message: 'Не удалось удалить категорию' });
    console.log('Ошибка в deleteCategory --->', err);
  }
};