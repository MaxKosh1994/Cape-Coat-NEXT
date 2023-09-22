/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Items',
      [
        {
          article: '001',
          name: 'Жакет - модель:001',
          description: 'Объемный жакет прямого кроя',
          model_params: 'Длина жакета 78 см. Рост модели 174 см.',
          characteristics: '',
          price: 10900,
          new_price: 0,
          in_stock: false,
          bestseller: false,
          collection_id: 1,
          material_id: 15,
          category_id: 5,
        },

        {
          article: '002',
          name: 'Жакет - модель:002',
          description: 'Жакет на завязках',
          model_params: 'Длина жакета 78 см. Рост модели 174 см.',
          characteristics: '',
          price: 10900,
          new_price: 0,
          in_stock: false,
          bestseller: false,
          collection_id: 1,
          material_id: 14,
          category_id: 5,
        },

        {
          article: '003',
          name: 'Жакет - модель:003',
          description: 'Приталенный жакет с акцентными плечами',
          model_params: 'Длина жакета 78 см. Рост модели 174 см.',
          characteristics: '',
          price: 10900,
          new_price: 0,
          in_stock: false,
          bestseller: false,
          collection_id: 1,
          material_id: 19,
          category_id: 5,
        },

        {
          article: '004',
          name: 'Жакет - модель:004',
          description: 'Приталенный двубортный жакет со шнуровкой',
          model_params: 'Длина жакета 78 см. Рост модели 174 см.',
          characteristics: '',
          price: 10900,
          new_price: 0,
          in_stock: false,
          bestseller: false,
          collection_id: 1,
          material_id: 19,
          category_id: 5,
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Items', null, {});
  },
};
