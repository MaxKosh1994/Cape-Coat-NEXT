/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Photos',
      [
        {
          photo: 'IMG_1454.JPG',
          item_id: 28,
        },
        {
          photo: 'IMG_1455.JPG',
          item_id: 28,
        },
        {
          photo: 'IMG_1456.JPG',
          item_id: 28,
        },
        {
          photo: 'IMG_1477.JPG',
          item_id: 29,
        },
        {
          photo: 'IMG_1478.JPG',
          item_id: 29,
        },
        {
          photo: 'IMG_1484.JPG',
          item_id: 29,
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
