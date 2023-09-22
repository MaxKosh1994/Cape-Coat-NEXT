/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Items',
      [
        {
          article: '013',
          name: 'Шуба - модель:013',
          description: 'Шуба с цельнокроеным рукавом',
          model_params: 'Длина 120 см. Рост модели 172 см.',
          characteristics: '',
          price: 15500,
          new_price: 0,
          in_stock: false,
          bestseller: false,
          collection_id: 1,
          material_id: 12,
          category_id: 4,
        },

        {
          article: '012',
          name: 'Шуба - модель:012',
          description: 'Объемная шуба',
          model_params: 'Длина 135 см. Рост модели 177 см.',
          characteristics: '',
          price: 15500,
          new_price: 0,
          in_stock: false,
          bestseller: true,
          collection_id: 1,
          material_id: 13,
          category_id: 4,
        },

        {
          article: '022',
          name: 'Шуба - модель:022',
          description: 'Объемная двубортная шуба',
          model_params: 'Длина 126 см. Рост модели 172 см.',
          characteristics: '',
          price: 15500,
          new_price: 0,
          in_stock: false,
          bestseller: false,
          collection_id: 1,
          material_id: 12,
          category_id: 4,
        },

        {
          article: '018',
          name: 'Шуба - модель:018',
          description: 'Шуба-рубашка',
          model_params: 'Длина изделия 80 см. Рост модели 168 см.',
          characteristics: '',
          price: 13500,
          new_price: 0,
          in_stock: false,
          bestseller: false,
          collection_id: 1,
          material_id: 12,
          category_id: 4,
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Items', null, {});
  },
};
