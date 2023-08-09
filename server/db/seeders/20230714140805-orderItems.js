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
        },
        {
          order_id: 1,
          item_id: 2,
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
