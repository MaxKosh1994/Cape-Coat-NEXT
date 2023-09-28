/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Items',
      [
        {
          article: '011',
          name: 'Тренч - модель:011',
          description: 'Двубортный тренч из хлопка с одним рядом пуговиц',
          model_params: 'Длина изделия 125 см. Рост модели 174 см.',
          characteristics: '',
          price: 14500,
          new_price: 0,
          in_stock: false,
          bestseller: false,
          collection_id: 1,
          material_id: 2,
          category_id: 1,
        },

        {
          article: '003',
          name: 'Тренч - модель:003',
          description: 'Самая объёмная модель тренча в нашей линейке',
          model_params: 'Длина изделия 135 см. Рост модели 174 см.',
          characteristics: '',
          price: 14500,
          new_price: 0,
          in_stock: false,
          bestseller: true,
          collection_id: 1,
          material_id: 3,
          category_id: 1,
        },

        {
          article: '010',
          name: 'Тренч - модель:010',
          description: 'Тренч из хлопка среднего объема с манжетами на рукавах',
          model_params: 'Длина изделия 125 см. Рост модели 174 см.',
          characteristics: '',
          price: 14500,
          new_price: 0,
          in_stock: false,
          bestseller: false,
          collection_id: 1,
          material_id: 3,
          category_id: 1,
        },

        {
          article: '004',
          name: 'Тренч - модель:004',
          description: 'Тренч из хлопка прямого кроя с воротником-стойкой',
          model_params: 'Длина изделия 122 см. Рост модели 168 см.',
          characteristics: '',
          price: 14500,
          new_price: 0,
          in_stock: false,
          bestseller: false,
          collection_id: 1,
          material_id: 1,
          category_id: 1,
        },

        {
          article: '002',
          name: 'Тренч - модель:002',
          description: 'Тренч из хлопка классического кроя',
          model_params: 'Длина изделия 122 см. Рост модели 174 см.',
          characteristics: '',
          price: 14500,
          new_price: 0,
          in_stock: false,
          bestseller: true,
          collection_id: 1,
          material_id: 2,
          category_id: 1,
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Items', null, {});
  },
};
