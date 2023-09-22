/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Photos',
      [
        {
          photo: 'IMG_1417 (1).jpg',
          item_id: 21,
        },
        {
          photo: 'IMG_1418 (1).jpg',
          item_id: 21,
        },
        {
          photo: 'IMG_1419 (1).jpg',
          item_id: 21,
        },
        {
          photo: 'IMG_1420 (1).jpg',
          item_id: 21,
        },
        {
          photo: 'IMG_1421 (1).jpg',
          item_id: 22,
        },
        {
          photo: 'IMG_1422 (1).jpg',
          item_id: 22,
        },
        {
          photo: 'IMG_1423.JPG',
          item_id: 22,
        },
        {
          photo: 'IMG_1424 (1).jpg',
          item_id: 22,
        },
        {
          photo: 'IMG_1428.JPG',
          item_id: 23,
        },
        {
          photo: 'IMG_1427 (1).jpg',
          item_id: 23,
        },
        {
          photo: 'IMG_1425 (1).jpg',
          item_id: 23,
        },
        {
          photo: 'IMG_1426 (1).jpg',
          item_id: 23,
        },
        {
          photo: '888.JPG',
          item_id: 24,
        },
        {
          photo: '889.JPG',
          item_id: 24,
        },
        {
          photo: '890.JPG',
          item_id: 24,
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
