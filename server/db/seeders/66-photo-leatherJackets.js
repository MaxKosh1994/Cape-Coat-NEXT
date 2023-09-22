/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Photos',
      [
        {
          photo: 'IMG_1431 (1).jpg',
          item_id: 25,
        },
        {
          photo: 'IMG_1429 (1).jpg',
          item_id: 25,
        },
        {
          photo: 'IMG_1430.JPG',
          item_id: 25,
        },
        {
          photo: 'IMG_1442.JPG',
          item_id: 26,
        },
        {
          photo: 'IMG_1443.JPG',
          item_id: 26,
        },
        {
          photo: 'IMG_1444.JPG',
          item_id: 26,
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
