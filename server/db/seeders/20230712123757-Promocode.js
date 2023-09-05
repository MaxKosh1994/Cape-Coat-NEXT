/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Promocodes',
      [
        {
          code: 'WELCOME',
          percent: 10,
        },
        {
          code: 'ZHOPA15',
          percent: 15,
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Promocodes', null, {});
  },
};
