/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Collections',

      // TODO поменять description, current
      [
        {
          name: 'Осень-Зима 2023',
          photo:
            'https://1001sovety.ru/wp-content/uploads/2021/05/luki-osen-zima-55.jpg',
          description: 'Холодно пиздец',
          urlName: 'fall-winter-2023',
          current: true,
        },
        {
          name: 'Весна-Лето 2024',
          photo:
            'https://1001sovety.ru/wp-content/uploads/2019/11/zhenskiye-kostyumy-63.jpg',
          description: 'Жарко пиздец',
          urlName: 'spring-summer-2024',
          current: true,
        },
        {
          name: 'Платья',
          photo:
            'https://assets.vogue.ru/photos/6055aa4e277efc3790234a64/2:3/w_2560%2Cc_limit/210312_Ramadan_0608.jpg',
          description: 'Ну крч платья',
          urlName: 'dresses',
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
