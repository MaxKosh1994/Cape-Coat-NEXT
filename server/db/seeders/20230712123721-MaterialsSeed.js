/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Materials',
      [
        { name: 'кожа дракона', photo: 'IMG_1378.JPG', category_id: 1 },
        { name: 'илитная черепаха', photo: 'IMG_1376.JPG', category_id: 1 },
        { name: 'дерево', photo: 'IMG_1377.JPG', category_id: 1 },
        { name: 'илитная черепаха', photo: 'IMG_1379.JPG', category_id: 1 },
        { name: 'чугун', photo: 'IMG_1406.JPG', category_id: 2 },
        { name: 'сталь', photo: 'IMG_1407.JPG', category_id: 2 },
        { name: 'шубная шуба', photo: 'IMG_1408.JPG', category_id: 2 },
        { name: 'пластик', photo: 'IMG_1409.JPG', category_id: 2 },
        { name: 'из говна', photo: 'IMG_1410.JPG', category_id: 2 },
        { name: 'шерсть', photo: 'IMG_1411.JPG', category_id: 2 },
        { name: 'велюр', photo: 'IMG_1467.JPG', category_id: 3 },
        { name: 'тряпка', photo: 'IMG_1468.JPG', category_id: 3 },
        { name: 'бабкины рейтузы', photo: 'IMG_1469.JPG', category_id: 3 },
        { name: 'космическая нежность', photo: 'IMG_1471.JPG', category_id: 3 },
        { name: 'водоросли', photo: 'IMG_1491.JPG', category_id: 3 },
        { name: 'лопух', photo: 'IMG_1492.JPG', category_id: 3 },
        { name: 'родорожник', photo: 'IMG_1467.JPG', category_id: 4 },
        { name: 'войлок', photo: 'IMG_1468.JPG', category_id: 4 },
        { name: 'хороший материал', photo: 'IMG_1469.JPG', category_id: 4 },
        { name: 'немного лучше', photo: 'IMG_1471.JPG', category_id: 4 },
        { name: 'чугун', photo: 'IMG_1491.JPG', category_id: 4 },
        { name: 'самый лучший', photo: 'IMG_1492.JPG', category_id: 4 },
        { name: 'чугун', photo: 'IMG_1412.JPG', category_id: 5 },
        { name: 'водоросли', photo: 'IMG_1413.JPG', category_id: 5 },
        { name: 'велюр', photo: 'IMG_1414.JPG', category_id: 5 },
        { name: 'шерсть верблюда', photo: 'IMG_1415.JPG', category_id: 5 },
        { name: 'кошачья шерсть', photo: 'IMG_1416.JPG', category_id: 5 },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Materials', null, {});
  },
};
