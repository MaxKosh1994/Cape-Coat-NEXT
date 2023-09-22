/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Photos',
      [
        {
          photo: 'IMG_7432.JPG',
          item_id: 6,
        },
        {
          photo: 'IMG_7429.JPG',
          item_id: 6,
        },
        {
          photo: 'IMG_7430.JPG',
          item_id: 6,
        },
        {
          photo: 'IMG_7808.JPG',
          item_id: 7,
        },
        {
          photo: 'IMG_7809.JPG',
          item_id: 7,
        },
        {
          photo: 'IMG_7813.JPG',
          item_id: 7,
        },
        {
          photo: 'IMG_7816.JPG',
          item_id: 7,
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
