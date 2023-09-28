/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Collections',
      [
        {
          name: 'Осень-Зима 23/24',
          photo:
            'https://1001sovety.ru/wp-content/uploads/2021/05/luki-osen-zima-55.jpg',
          description: '',
          urlName: 'fall-winter-23-24',
          current: true,
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Collections', null, {});
  },
};
