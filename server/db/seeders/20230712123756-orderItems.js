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
          item_id: 1,
          height: '180',
          length: '100',
          sleeve: '40',
          bust: '90',
          waist: '60',
          hips: '90',
          saddle: '',
          loops: true,
          buttons: 'knopki',
          lining: '',
        },
        {
          order_id: 1,
          item_id: 2,
        },
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
