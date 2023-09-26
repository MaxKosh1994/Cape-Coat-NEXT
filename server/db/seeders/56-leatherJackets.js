/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Items',
      [
        {
          article: '102',
          name: 'Жакет - модель:102',
          description: 'Жакет на завязках из эко-кожи',
          model_params: 'Длина жакета 78 см. Рост модели 174 см.',
          characteristics: '',
          price: 10900,
          new_price: 0,
          in_stock: false,
          bestseller: true,
          collection_id: 1,
          material_id: 22,
          category_id: 6,
        },

        {
          article: '101',
          name: 'Жакет - модель:101',
          description: 'Объемный жакет прямого кроя из эко-кожи',
          model_params: 'Длина жакета 78 см. Рост модели 174 см.',
          characteristics: '',
          price: 10900,
          new_price: 0,
          in_stock: false,
          bestseller: false,
          collection_id: 1,
          material_id: 22,
          category_id: 6,
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Items', null, {});
  },
};
