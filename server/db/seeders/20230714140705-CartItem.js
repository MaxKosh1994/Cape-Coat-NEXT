/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'CartItems',
      [
        {
          cart_id: 1,
          item_id: 1,
        },
        {
          cart_id: 1,
          item_id: 8,
        },
        {
          cart_id: 1,
          item_id: 2,
        },
        {
          cart_id: 1,
          item_id: 4,
        },
        //   {
        //     cart_id: 2,
        //     item_id: 1,
        //   },
        //   {
        //     cart_id: 2,
        //     item_id: 8,
        //   },
        //   {
        //     cart_id: 2,
        //     item_id: 2,
        //   },
        //   {
        //     cart_id: 2,
        //     item_id: 4,
        //   },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('CartItems', null, {});
  },
};
