/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Photos',
      [
        {
          photo: 'IMG_7846.JPG',
          item_id: 1,
        },
        {
          photo: 'IMG_7852.JPG',
          item_id: 1,
        },
        {
          photo: 'IMG_7841.JPG',
          item_id: 1,
        },
        {
          photo: 'IMG_7849.JPG',
          item_id: 1,
        },
        {
          photo: 'IMG_7376.JPG',
          item_id: 2,
        },
        {
          photo: 'IMG_7380.JPG',
          item_id: 2,
        },
        {
          photo: 'IMG_7383.JPG',
          item_id: 2,
        },
        {
          photo: 'IMG_7857.JPG',
          item_id: 3,
        },
        {
          photo: 'IMG_7858.JPG',
          item_id: 3,
        },
        {
          photo: 'IMG_7860.JPG',
          item_id: 3,
        },
        {
          photo: 'IMG_7856.JPG',
          item_id: 3,
        },
        {
          photo: 'IMG_7828.JPG',
          item_id: 4,
        },
        {
          photo: 'IMG_7826.JPG',
          item_id: 4,
        },
        {
          photo: 'IMG_7831.JPG',
          item_id: 4,
        },
        {
          photo: 'IMG_7827.JPG',
          item_id: 4,
        },
        {
          photo: 'IMG_7834.JPG',
          item_id: 4,
        },
        {
          photo: 'IMG_7833.JPG',
          item_id: 4,
        },
        {
          photo: 'IMG_7363.JPG',
          item_id: 5,
        },
        {
          photo: 'IMG_7367.JPG',
          item_id: 5,
        },
        {
          photo: 'IMG_7369.JPG',
          item_id: 5,
        },
        {
          photo: 'IMG_7363.JPG',
          item_id: 5,
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
