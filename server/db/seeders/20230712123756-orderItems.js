/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      'OrderItems',
      [
        {
          order_id: 1,
          measurements: 'тут короче инфа о заказе',
          item_id: 1,
        },
        {
          order_id: 1,
          measurements:
            'тут большая инфа о заказе. Нам необходима дизайнерская концепция логотипа. Предпочтительный стиль – минимализм с ярким акцентом на уникальность бренда. Пожалуйста, предоставьте портфолио и информацию о сроках выполнения и стоимости. Готовы обсудить дополнительные детали для достижения наилучшего результата.',
          item_id: 2,
        },
        {
          order_id: 2,
          measurements:
            'тут большая инфа о заказе. Нам необходима дизайнерская концепция логотипа. Предпочтительный стиль – минимализм с ярким акцентом на уникальность бренда. Пожалуйста, предоставьте портфолио и информацию о сроках выполнения и стоимости. Готовы обсудить дополнительные детали для достижения наилучшего результата.',
          item_id: 4,
        },
        //   {
        //     order_id: 2,
        //     item_id: 4,
        //   },
        //   {
        //     order_id: 3,
        //     item_id: 3,
        //   },
        //   {
        //     order_id: 4,
        //     item_id: 5,
        //   },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('Measurements', null, {});
     */
    await queryInterface.bulkDelete('OrderItems', null, {});
  },
};
