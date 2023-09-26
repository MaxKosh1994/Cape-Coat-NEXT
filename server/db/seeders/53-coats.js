/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Items',
      [
        {
          article: '015',
          name: 'Пальто - модель:015',
          description:
            'Двубортное пальто объемного кроя со спущенным плечом и декоративными погонами',
          model_params: 'Длина изделия 125 см. Рост модели 177 см',
          characteristics: '',
          price: 17500,
          new_price: 0,
          in_stock: false,
          bestseller: true,
          collection_id: 1,
          material_id: 9,
          category_id: 3,
        },

        {
          article: '014',
          name: 'Пальто - модель:014',
          description:
            'Двубортное пальто объемного кроя с рукавом реглан. Дополнено декоративными погонами и патами на рукавах',
          model_params: 'Длина изделия 126 см. Рост модели 177 см',
          characteristics: '',
          price: 17500,
          new_price: 0,
          in_stock: false,
          bestseller: true,
          collection_id: 1,
          material_id: 11,
          category_id: 3,
        },

        {
          article: '017',
          name: 'Пальто - модель:017',
          description: 'Двубортное прямое пальто со втачным рукавом',
          model_params: 'Длина изделия 120 см. Рост модели 174 см',
          characteristics: '',
          price: 17500,
          new_price: 0,
          in_stock: false,
          bestseller: false,
          collection_id: 1,
          material_id: 7,
          category_id: 3,
        },

        {
          article: '006',
          name: 'Пальто - модель:006',
          description: 'Объемное пальто прямого кроя со спущенным плечом',
          model_params: 'Длина изделия 125 см. Рост модели 168 см',
          characteristics: '',
          price: 17500,
          new_price: 0,
          in_stock: false,
          bestseller: false,
          collection_id: 1,
          material_id: 11,
          category_id: 3,
        },

        {
          article: '021',
          name: 'Пальто - модель:021',
          description: 'Двубортное пальто прямого кроя с манжетами на рукавах',
          model_params: 'Длина изделия 125 см. Рост модели 174 см',
          characteristics: '',
          price: 17500,
          new_price: 0,
          in_stock: false,
          bestseller: false,
          collection_id: 1,
          material_id: 8,
          category_id: 3,
        },

        {
          article: '007',
          name: 'Пальто - модель:007',
          description: 'Приталенное двубортное пальто со втачным рукавом',
          model_params: 'Длина изделия 125 см. Рост модели 168 см.',
          characteristics: '',
          price: 17500,
          new_price: 0,
          in_stock: false,
          bestseller: false,
          collection_id: 1,
          material_id: 11,
          category_id: 3,
        },

        {
          article: '019',
          name: 'Пальто - модель:019',
          description:
            'Объемное пальто-жакет с уширенными плечами и втачным рукавом',
          model_params: 'Длина пальто 85 см. Рост модели 174 см.',
          characteristics: '',
          price: 17500,
          new_price: 0,
          in_stock: false,
          bestseller: false,
          collection_id: 1,
          material_id: 11,
          category_id: 3,
        },

        {
          article: '010',
          name: 'Пальто - модель:010',
          description: 'Прямое классическое пальто с цельнокроенным рукавом',
          model_params: 'Длина 120 см. Рост модели 172 см.',

          characteristics: '',
          price: 17500,
          new_price: 0,
          in_stock: false,
          bestseller: false,
          collection_id: 1,
          material_id: 9,
          category_id: 3,
        },

        {
          article: '008',
          name: 'Пальто - модель:008',
          description:
            'Прямое базовое пальто среднего объёма со спущенным плечом.',
          model_params: 'Длина 120 см. Рост модели 177 см.',
          characteristics: '',
          price: 17500,
          new_price: 0,
          in_stock: false,
          bestseller: false,
          collection_id: 1,
          material_id: 9,
          category_id: 3,
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Items', null, {});
  },
};
