/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Photos',
      [
        {
          photo: 'IMG_0996.JPG',
          item_id: 17,
        },
        {
          photo: 'IMG_0998.JPG',
          item_id: 17,
        },
        {
          photo: 'IMG_1001.JPG',
          item_id: 17,
        },
        {
          photo: 'IMG_8667.JPG',
          item_id: 18,
        },
        {
          photo: 'IMG_8670.JPG',
          item_id: 18,
        },
        {
          photo: 'IMG_8671.JPG',
          item_id: 18,
        },
        {
          photo: 'IMG_0975.JPG',
          item_id: 19,
        },
        {
          photo: 'IMG_0974.JPG',
          item_id: 19,
        },
        {
          photo: 'IMG_0982.JPG',
          item_id: 19,
        },
        {
          photo: 'IMG_8656.JPG',
          item_id: 20,
        },
        {
          photo: 'IMG_8657.JPG',
          item_id: 20,
        },
        {
          photo: 'IMG_8659.JPG',
          item_id: 20,
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
