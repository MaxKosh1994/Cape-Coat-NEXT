/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Items',
      [
        {
          article: '001',
          name: 'Брюки - модель:001',
          description:
            'Брюки широкие с одной складкой из плотной костюмной ткани',
          model_params: 'Рост модели 174 см.',
          characteristics: '',
          price: 5900,
          new_price: 0,
          in_stock: false,
          bestseller: true,
          collection_id: 1,
          material_id: 31,
          category_id: 8,
        },

        {
          article: '002',
          name: 'Брюки - модель:002',
          description:
            'Брюки широкие с двумя складками из плотной костюмной ткани',
          model_params: 'Рост модели 174 см.',
          characteristics: '',
          price: 5900,
          new_price: 0,
          in_stock: false,
          bestseller: true,
          collection_id: 1,
          material_id: 32,
          category_id: 8,
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Items', null, {});
  },
};
