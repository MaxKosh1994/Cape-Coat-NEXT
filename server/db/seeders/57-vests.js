/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Items',
      [
        {
          article: '001',
          name: 'Жилет - модель:001',
          description: 'Жилет из плотной костюмной ткани',
          model_params: 'Рост модели 174 см.',
          characteristics: '',
          price: 5500,
          new_price: 0,
          in_stock: false,
          bestseller: false,
          collection_id: 1,
          material_id: 27,
          category_id: 7,
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Items', null, {});
  },
};
