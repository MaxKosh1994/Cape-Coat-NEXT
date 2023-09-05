/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Favorites',
      [
        {
          user_id: 1,
          item_id: 10,
        },
        {
          user_id: 1,
          item_id: 1,
        },
        {
          user_id: 1,
          item_id: 2,
        },
        {
          user_id: 1,
          item_id: 6,
        },
        //   {
        //     user_id: 2,
        //     item_id: 10,
        //   },
        //   {
        //     user_id: 2,
        //     item_id: 1,
        //   },
        //   {
        //     user_id: 2,
        //     item_id: 2,
        //   },
        //   {
        //     user_id: 2,
        //     item_id: 6,
        //   },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Favorites', null, {});
  },
};
