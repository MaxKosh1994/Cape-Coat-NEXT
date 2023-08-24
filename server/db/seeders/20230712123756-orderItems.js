/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const orderItems = [];

    for (let i = 0; i < 24; i++) {
      orderItems.push({
        order_id: i + 1,
        measurements: 'тут мерки заказчика, пока строкой, это изменится!',
        item_id: i + 1,
      });
    }

    return queryInterface.bulkInsert('OrderItems', orderItems, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('OrderItems', null, {});
  },
};
