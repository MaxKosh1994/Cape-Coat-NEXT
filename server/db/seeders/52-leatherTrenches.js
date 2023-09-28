/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Items',
      [
        {
          article: '008',
          name: 'Тренч - модель:008',
          description: 'Тренч из эко-кожи прямого кроя',
          model_params: 'Длина изделия 125 см. Рост модели 177 см.',
          characteristics: '',
          price: 14900,
          new_price: 0,
          in_stock: false,
          bestseller: false,
          collection_id: 1,
          material_id: 4,
          category_id: 2,
        },

        {
          article: '009',
          name: 'Тренч - модель:009',
          description: 'Тренч из эко-кожи с манжетами',
          model_params: 'Длина изделия 126 см. Рост модели 174 см.',
          characteristics: '',
          price: 14900,
          new_price: 0,
          in_stock: false,
          bestseller: true,
          collection_id: 1,
          material_id: 4,
          category_id: 2,
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Items', null, {});
  },
};
