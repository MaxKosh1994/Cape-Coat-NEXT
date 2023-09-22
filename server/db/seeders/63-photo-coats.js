/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Photos',
      [
        {
          photo: 'IMG_8022.JPG',
          item_id: 8,
        },
        {
          photo: 'IMG_8035.JPG',
          item_id: 8,
        },
        {
          photo: 'IMG_8040.JPG',
          item_id: 8,
        },
        {
          photo: 'IMG_1382.JPG',
          item_id: 9,
        },
        {
          photo: 'IMG_1383.JPG',
          item_id: 9,
        },
        {
          photo: 'IMG_1384.JPG',
          item_id: 9,
        },
        {
          photo: 'IMG_1385.JPG',
          item_id: 10,
        },
        {
          photo: 'IMG_1386.JPG',
          item_id: 10,
        },
        {
          photo: 'IMG_1387.JPG',
          item_id: 10,
        },
        {
          photo: 'IMG_1389.JPG',
          item_id: 11,
        },
        {
          photo: 'IMG_1388.JPG',
          item_id: 11,
        },
        {
          photo: 'IMG_1390.JPG',
          item_id: 11,
        },
        {
          photo: 'IMG_1394.JPG',
          item_id: 12,
        },
        {
          photo: 'IMG_1395.JPG',
          item_id: 12,
        },
        {
          photo: 'IMG_1396.JPG',
          item_id: 12,
        },
        {
          photo: 'IMG_1397.JPG',
          item_id: 13,
        },
        {
          photo: 'IMG_1398.JPG',
          item_id: 13,
        },
        {
          photo: 'IMG_1399.JPG',
          item_id: 13,
        },
        {
          photo: 'IMG_1391.JPG',
          item_id: 14,
        },
        {
          photo: 'IMG_1392.JPG',
          item_id: 14,
        },
        {
          photo: 'IMG_1393.JPG',
          item_id: 14,
        },
        {
          photo: 'IMG_1403.JPG',
          item_id: 15,
        },
        {
          photo: 'IMG_1404.JPG',
          item_id: 15,
        },
        {
          photo: 'IMG_1405.JPG',
          item_id: 15,
        },
        {
          photo: 'IMG_1401.JPG',
          item_id: 16,
        },
        {
          photo: 'IMG_1400.JPG',
          item_id: 16,
        },
        {
          photo: 'IMG_1402.JPG',
          item_id: 16,
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
     * await queryInterface.bulkDelete('Photos', null, {});
     */
    await queryInterface.bulkDelete('Photos', null, {});
  },
};
