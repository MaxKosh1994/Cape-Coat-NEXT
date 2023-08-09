/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Materials',
      [
        {
          photo: 'IMG_1378.JPG',
          category_id: 1,
        },
        {
          photo: 'IMG_1376.JPG',
          category_id: 1,
        },
        {
          photo: 'IMG_1377.JPG',
          category_id: 1,
        },
        {
          photo: 'IMG_1379.JPG',
          category_id: 1,
        },
        {
          photo: 'IMG_1406.JPG',
          category_id: 2,
        },
        {
          photo: 'IMG_1407.JPG',
          category_id: 2,
        },
        {
          photo: 'IMG_1408.JPG',
          category_id: 2,
        },
        {
          photo: 'IMG_1409.JPG',
          category_id: 2,
        },
        {
          photo: 'IMG_1410.JPG',
          category_id: 2,
        },
        {
          photo: 'IMG_1411.JPG',
          category_id: 2,
        },
        {
          photo: 'IMG_1467.JPG',
          category_id: 3,
        },
        {
          photo: 'IMG_1468.JPG',
          category_id: 3,
        },
        {
          photo: 'IMG_1469.JPG',
          category_id: 3,
        },
        {
          photo: 'IMG_1471.JPG',
          category_id: 3,
        },
        {
          photo: 'IMG_1491.JPG',
          category_id: 3,
        },
        {
          photo: 'IMG_1492.JPG',
          category_id: 3,
        },
        {
          photo: 'IMG_1467.JPG',
          category_id: 4,
        },
        {
          photo: 'IMG_1468.JPG',
          category_id: 4,
        },
        {
          photo: 'IMG_1469.JPG',
          category_id: 4,
        },
        {
          photo: 'IMG_1471.JPG',
          category_id: 4,
        },
        {
          photo: 'IMG_1491.JPG',
          category_id: 4,
        },
        {
          photo: 'IMG_1492.JPG',
          category_id: 4,
        },
        {
          photo: 'IMG_1412.JPG',
          category_id: 5,
        },
        {
          photo: 'IMG_1413.JPG',
          category_id: 5,
        },
        {
          photo: 'IMG_1414.JPG',
          category_id: 5,
        },
        {
          photo: 'IMG_1415.JPG',
          category_id: 5,
        },
        {
          photo: 'IMG_1416.JPG',
          category_id: 5,
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Materials', null, {});
  },
};
