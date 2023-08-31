const { Item, Material, Category } = require('../../../db/models');

module.exports.createMaterial = async (req, res) => {
  try {
    const { files } = req;
    const { name, category_id } = JSON.parse(req.body.description);
    const material = await Material.create({
      name,
      category_id,
      photo: files[0].filename,
    });
    const result = material.get({ plain: true });

    res.status(200).json({ message: 'Материал добавлен', res: result });
  } catch (err) {
    res.status(400).json({ message: 'Не удалось добавить материал' });
    console.log('Ошибка в createMaterial --->', err);
  }
};

module.exports.readMaterial = async (req, res) => {
  try {
    const allMaterial = await Material.findAll({ raw: true });
    res.status(200).json({ message: 'success', res: allMaterial });
  } catch (err) {
    res.status(400).json({ message: 'error' });
    console.log('Ошибка в readMaterial --->', err);
  }
};

module.exports.updateMaterial = async (req, res) => {
  try {
    const { files } = req;
    const photo = files[0]?.filename;
    let { name, category_id, material_id } = JSON.parse(req.body.description);
    const [rowsAffected, [updatedMaterial]] = await Material.update(
      { name, category_id, photo },
      { where: { id: material_id }, individualHooks: true },
    );
    const result = updatedMaterial.dataValues;
    res.status(200).json({
      message: 'Материал изменен',
      res: result,
    });
  } catch (err) {
    res.status(400).json({ message: 'Не удалось изменить материал' });
    console.log('Ошибка в updateMaterial --->', err);
  }
};

module.exports.deleteMaterial = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const material = await Material.destroy({
      where: { id },
      individualHooks: true,
    });
    res.status(200).json({ message: 'Материал удален' });
  } catch (err) {
    res.status(400).json({ message: 'Не удалось удалить материал' });
    console.log('Ошибка в deleteMaterial --->', err);
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
