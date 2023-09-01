const { Promocode } = require('../../../db/models');

module.exports.readAllPromo = async (req, res) => {
  try {
    const allPromocodes = await Promocode.findAll({
      raw: true,
      nest: true,
    });
    res
      .status(200)
      .json({ allPromocodes, message: 'Все промокоды успешно прочитаны' });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'error' });
  }
};

module.exports.createPromo = async (req, res) => {
  const { text, percent } = req.body;
  try {
    const newPromo = await Promocode.create({
      code: text,
      percent,
    });
    res.status(200).json({ newPromo, message: 'Промокод успешно создан' });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'error' });
  }
};

module.exports.updatePromo = async (req, res) => {
  const { id } = req.params;
  const { code, percent } = req.body;
  try {
    const updatingPromo = await Promocode.findOne({ where: { id } });

    if (!updatingPromo) {
      return res.status(404).json({ message: 'Gромокод не найден' });
    }

    if (code) {
      updatingPromo.code = code;
    }

    if (percent) {
      updatingPromo.percent = percent;
    }
    await updatingPromo.save();

    return res.status(200).json(updatingPromo);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'error' });
  }
};

module.exports.deletePromo = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Promocode.destroy({
      where: { id },
    });

    if (!deleted) {
      return res.status(400).json({ message: 'Промокод не найден' });
    }

    return res.status(200).json({ message: 'Промокод успешно удален' });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'error' });
  }
};
