const { Task } = require('../../../db/models');

module.exports.createTask = async (req, res) => {
  try {
    const newTask = await Task.create({});
    res.status(200).json({ message: 'success', newTask });
  } catch (err) {
    res.status(400).json({ message: 'error' });
    console.log('Ошибка в readcollection --->', err);
  }
};
