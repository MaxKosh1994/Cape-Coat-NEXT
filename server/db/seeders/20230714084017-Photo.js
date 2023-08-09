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
          photo: 'IMG_7369.JPG',
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
          photo: 'IMG_7846.JPG',
          item_id: 2,
        },
        {
          photo: 'IMG_7369.JPG',
          item_id: 2,
        },
        {
          photo: 'IMG_7852.JPG',
          item_id: 2,
        },
        {
          photo: 'IMG_7841.JPG',
          item_id: 2,
        },
        {
          photo: 'IMG_7849.JPG',
          item_id: 2,
        },
        {
          photo: 'IMG_7376.JPG',
          item_id: 3,
        },
        {
          photo: 'IMG_7380.JPG',
          item_id: 3,
        },
        {
          photo: 'IMG_7383.JPG',
          item_id: 3,
        },
        {
          photo: 'IMG_7376.JPG',
          item_id: 4,
        },
        {
          photo: 'IMG_7380.JPG',
          item_id: 4,
        },
        {
          photo: 'IMG_7383.JPG',
          item_id: 4,
        },
        {
          photo: 'IMG_7857.JPG',
          item_id: 5,
        },
        {
          photo: 'IMG_7858.JPG',
          item_id: 5,
        },
        {
          photo: 'IMG_7860.JPG',
          item_id: 5,
        },
        {
          photo: 'IMG_7856.JPG',
          item_id: 5,
        },
        {
          photo: 'IMG_7371.JPG',
          item_id: 5,
        },
        {
          photo: 'IMG_7370.JPG',
          item_id: 5,
        },
        {
          photo: 'IMG_7857.JPG',
          item_id: 6,
        },
        {
          photo: 'IMG_7858.JPG',
          item_id: 6,
        },
        {
          photo: 'IMG_7860.JPG',
          item_id: 6,
        },
        {
          photo: 'IMG_7856.JPG',
          item_id: 6,
        },
        {
          photo: 'IMG_7371.JPG',
          item_id: 6,
        },
        {
          photo: 'IMG_7370.JPG',
          item_id: 6,
        },
        {
          photo: 'IMG_7826.JPG',
          item_id: 7,
        },
        {
          photo: 'IMG_7828.JPG',
          item_id: 7,
        },
        {
          photo: 'IMG_7831.JPG',
          item_id: 7,
        },
        {
          photo: 'IMG_7827.JPG',
          item_id: 7,
        },
        {
          photo: 'IMG_7834.JPG',
          item_id: 7,
        },
        {
          photo: 'IMG_7833.JPG',
          item_id: 7,
        },
        {
          photo: 'IMG_7826.JPG',
          item_id: 8,
        },
        {
          photo: 'IMG_7828.JPG',
          item_id: 8,
        },
        {
          photo: 'IMG_7831.JPG',
          item_id: 8,
        },
        {
          photo: 'IMG_7827.JPG',
          item_id: 8,
        },
        {
          photo: 'IMG_7834.JPG',
          item_id: 8,
        },
        {
          photo: 'IMG_7833.JPG',
          item_id: 8,
        },
        {
          photo: 'IMG_7363.JPG',
          item_id: 9,
        },
        {
          photo: 'IMG_7365.JPG',
          item_id: 9,
        },
        {
          photo: 'IMG_7367.JPG',
          item_id: 9,
        },
        {
          photo: 'IMG_7363.JPG',
          item_id: 10,
        },
        {
          photo: 'IMG_7365.JPG',
          item_id: 10,
        },
        {
          photo: 'IMG_7367.JPG',
          item_id: 10,
        },
        {
          photo: 'IMG_7429.JPG',
          item_id: 11,
        },
        {
          photo: 'IMG_7430.JPG',
          item_id: 11,
        },
        {
          photo: 'IMG_7432.JPG',
          item_id: 11,
        },
        {
          photo: 'IMG_7429.JPG',
          item_id: 12,
        },
        {
          photo: 'IMG_7430.JPG',
          item_id: 12,
        },
        {
          photo: 'IMG_7432.JPG',
          item_id: 12,
        },
        {
          photo: 'IMG_7808.JPG',
          item_id: 13,
        },
        {
          photo: 'IMG_7809.JPG',
          item_id: 13,
        },
        {
          photo: 'IMG_7813.JPG',
          item_id: 13,
        },
        {
          photo: 'IMG_7816.JPG',
          item_id: 13,
        },
        {
          photo: 'IMG_7808.JPG',
          item_id: 14,
        },
        {
          photo: 'IMG_7809.JPG',
          item_id: 14,
        },
        {
          photo: 'IMG_7813.JPG',
          item_id: 14,
        },
        {
          photo: 'IMG_7816.JPG',
          item_id: 14,
        },
        {
          photo: 'IMG_8022.JPG',
          item_id: 15,
        },
        {
          photo: 'IMG_8035.JPG',
          item_id: 15,
        },
        {
          photo: 'IMG_8040.JPG',
          item_id: 15,
        },
        {
          photo: 'IMG_8022.JPG',
          item_id: 16,
        },
        {
          photo: 'IMG_8035.JPG',
          item_id: 16,
        },
        {
          photo: 'IMG_8040.JPG',
          item_id: 16,
        },
        {
          photo: 'IMG_1382.JPG',
          item_id: 17,
        },
        {
          photo: 'IMG_1383.JPG',
          item_id: 17,
        },
        {
          photo: 'IMG_1384.JPG',
          item_id: 17,
        },
        {
          photo: 'IMG_1382.JPG',
          item_id: 18,
        },
        {
          photo: 'IMG_1383.JPG',
          item_id: 18,
        },
        {
          photo: 'IMG_1384.JPG',
          item_id: 18,
        },
        {
          photo: 'IMG_1385.JPG',
          item_id: 19,
        },
        {
          photo: 'IMG_1386.JPG',
          item_id: 19,
        },
        {
          photo: 'IMG_1387.JPG',
          item_id: 19,
        },
        {
          photo: 'IMG_1385.JPG',
          item_id: 20,
        },
        {
          photo: 'IMG_1386.JPG',
          item_id: 20,
        },
        {
          photo: 'IMG_1387.JPG',
          item_id: 20,
        },
        {
          photo: 'IMG_1388.JPG',
          item_id: 21,
        },
        {
          photo: 'IMG_1389.JPG',
          item_id: 21,
        },
        {
          photo: 'IMG_1390.JPG',
          item_id: 21,
        },
        {
          photo: 'IMG_1388.JPG',
          item_id: 22,
        },
        {
          photo: 'IMG_1389.JPG',
          item_id: 22,
        },
        {
          photo: 'IMG_1390.JPG',
          item_id: 22,
        },
        {
          photo: 'IMG_1394.JPG',
          item_id: 23,
        },
        {
          photo: 'IMG_1395.JPG',
          item_id: 23,
        },
        {
          photo: 'IMG_1396.JPG',
          item_id: 23,
        },
        {
          photo: 'IMG_1394.JPG',
          item_id: 24,
        },
        {
          photo: 'IMG_1395.JPG',
          item_id: 24,
        },
        {
          photo: 'IMG_1396.JPG',
          item_id: 24,
        },
        {
          photo: 'IMG_1397.JPG',
          item_id: 25,
        },
        {
          photo: 'IMG_1398.JPG',
          item_id: 25,
        },
        {
          photo: 'IMG_1399.JPG',
          item_id: 25,
        },
        {
          photo: 'IMG_1397.JPG',
          item_id: 26,
        },
        {
          photo: 'IMG_1398.JPG',
          item_id: 26,
        },
        {
          photo: 'IMG_1399.JPG',
          item_id: 26,
        },
        {
          photo: 'IMG_1391.JPG',
          item_id: 27,
        },
        {
          photo: 'IMG_1392.JPG',
          item_id: 27,
        },
        {
          photo: 'IMG_1393.JPG',
          item_id: 27,
        },
        {
          photo: 'IMG_1391.JPG',
          item_id: 28,
        },
        {
          photo: 'IMG_1392.JPG',
          item_id: 28,
        },
        {
          photo: 'IMG_1393.JPG',
          item_id: 28,
        },
        {
          photo: 'IMG_1403.JPG',
          item_id: 29,
        },
        {
          photo: 'IMG_1404.JPG',
          item_id: 29,
        },
        {
          photo: 'IMG_1405.JPG',
          item_id: 29,
        },
        {
          photo: 'IMG_1403.JPG',
          item_id: 30,
        },
        {
          photo: 'IMG_1404.JPG',
          item_id: 30,
        },
        {
          photo: 'IMG_1405.JPG',
          item_id: 30,
        },
        {
          photo: 'IMG_1400.JPG',
          item_id: 31,
        },
        {
          photo: 'IMG_1401.JPG',
          item_id: 31,
        },
        {
          photo: 'IMG_1402.JPG',
          item_id: 31,
        },
        {
          photo: 'IMG_1400.JPG',
          item_id: 32,
        },
        {
          photo: 'IMG_1401.JPG',
          item_id: 32,
        },
        {
          photo: 'IMG_1402.JPG',
          item_id: 32,
        },
        {
          photo: 'IMG_0996.JPG',
          item_id: 33,
        },
        {
          photo: 'IMG_0998.JPG',
          item_id: 33,
        },
        {
          photo: 'IMG_1001.JPG',
          item_id: 33,
        },
        {
          photo: 'IMG_0996.JPG',
          item_id: 34,
        },
        {
          photo: 'IMG_0998.JPG',
          item_id: 34,
        },
        {
          photo: 'IMG_1001.JPG',
          item_id: 34,
        },
        {
          photo: 'IMG_8667.JPG',
          item_id: 35,
        },
        {
          photo: 'IMG_8670.JPG',
          item_id: 35,
        },
        {
          photo: 'IMG_8671.JPG',
          item_id: 35,
        },
        {
          photo: 'IMG_8667.JPG',
          item_id: 36,
        },
        {
          photo: 'IMG_8670.JPG',
          item_id: 36,
        },
        {
          photo: 'IMG_8671.JPG',
          item_id: 36,
        },
        {
          photo: 'IMG_0974.JPG',
          item_id: 37,
        },
        {
          photo: 'IMG_0975.JPG',
          item_id: 37,
        },
        {
          photo: 'IMG_0982.JPG',
          item_id: 37,
        },
        {
          photo: 'IMG_0974.JPG',
          item_id: 38,
        },
        {
          photo: 'IMG_0975.JPG',
          item_id: 38,
        },
        {
          photo: 'IMG_0982.JPG',
          item_id: 38,
        },
        {
          photo: 'IMG_8656.JPG',
          item_id: 39,
        },
        {
          photo: 'IMG_8657.JPG',
          item_id: 39,
        },
        {
          photo: 'IMG_8659.JPG',
          item_id: 39,
        },
        {
          photo: 'IMG_8656.JPG',
          item_id: 40,
        },
        {
          photo: 'IMG_8657.JPG',
          item_id: 40,
        },
        {
          photo: 'IMG_8659.JPG',
          item_id: 40,
        },
        {
          photo: 'IMG_1417 (1).jpg',
          item_id: 41,
        },
        {
          photo: 'IMG_1418 (1).jpg',
          item_id: 41,
        },
        {
          photo: 'IMG_1419 (1).jpg',
          item_id: 41,
        },
        {
          photo: 'IMG_1420 (1).jpg',
          item_id: 41,
        },
        {
          photo: 'IMG_1417 (1).jpg',
          item_id: 42,
        },
        {
          photo: 'IMG_1418 (1).jpg',
          item_id: 42,
        },
        {
          photo: 'IMG_1419 (1).jpg',
          item_id: 42,
        },
        {
          photo: 'IMG_1420 (1).jpg',
          item_id: 42,
        },
        {
          photo: 'IMG_1421 (1).jpg',
          item_id: 43,
        },
        {
          photo: 'IMG_1422 (1).jpg',
          item_id: 43,
        },
        {
          photo: 'IMG_1423.JPG',
          item_id: 43,
        },
        {
          photo: 'IMG_1424 (1).jpg',
          item_id: 43,
        },
        {
          photo: 'IMG_1421 (1).jpg',
          item_id: 44,
        },
        {
          photo: 'IMG_1422 (1).jpg',
          item_id: 44,
        },
        {
          photo: 'IMG_1423.JPG',
          item_id: 44,
        },
        {
          photo: 'IMG_1424 (1).jpg',
          item_id: 44,
        },
        {
          photo: 'IMG_1429 (1).jpg',
          item_id: 45,
        },
        {
          photo: 'IMG_1430.JPG',
          item_id: 45,
        },
        {
          photo: 'IMG_1431 (1).jpg',
          item_id: 45,
        },
        {
          photo: 'IMG_1429 (1).jpg',
          item_id: 46,
        },
        {
          photo: 'IMG_1430.JPG',
          item_id: 46,
        },
        {
          photo: 'IMG_1431 (1).jpg',
          item_id: 46,
        },
        {
          photo: 'IMG_1442.JPG',
          item_id: 47,
        },
        {
          photo: 'IMG_1443.JPG',
          item_id: 47,
        },
        {
          photo: 'IMG_1444.JPG',
          item_id: 47,
        },
        {
          photo: 'IMG_1442.JPG',
          item_id: 48,
        },
        {
          photo: 'IMG_1443.JPG',
          item_id: 48,
        },
        {
          photo: 'IMG_1444.JPG',
          item_id: 48,
        },
        {
          photo: 'IMG_1425 (1).jpg',
          item_id: 49,
        },
        {
          photo: 'IMG_1426 (1).jpg',
          item_id: 49,
        },
        {
          photo: 'IMG_1427 (1).jpg',
          item_id: 49,
        },
        {
          photo: 'IMG_1428.JPG',
          item_id: 49,
        },
        {
          photo: 'IMG_1425 (1).jpg',
          item_id: 50,
        },
        {
          photo: 'IMG_1426 (1).jpg',
          item_id: 50,
        },
        {
          photo: 'IMG_1427 (1).jpg',
          item_id: 50,
        },
        {
          photo: 'IMG_1428.JPG',
          item_id: 50,
        },
        {
          photo: '888.JPG',
          item_id: 51,
        },
        {
          photo: '889.JPG',
          item_id: 51,
        },
        {
          photo: '890.JPG',
          item_id: 51,
        },
        {
          photo: '888.JPG',
          item_id: 52,
        },
        {
          photo: '889.JPG',
          item_id: 52,
        },
        {
          photo: '890.JPG',
          item_id: 52,
        },
        {
          photo: 'IMG_1482.JPG',
          item_id: 53,
        },
        {
          photo: 'IMG_1483.JPG',
          item_id: 53,
        },
        {
          photo: 'IMG_2484.JPG',
          item_id: 53,
        },
        {
          photo: 'IMG_1482.JPG',
          item_id: 54,
        },
        {
          photo: 'IMG_1483.JPG',
          item_id: 54,
        },
        {
          photo: 'IMG_2484.JPG',
          item_id: 54,
        },
        {
          photo: 'IMG_1454.JPG',
          item_id: 55,
        },
        {
          photo: 'IMG_1455.JPG',
          item_id: 55,
        },
        {
          photo: 'IMG_1456.JPG',
          item_id: 55,
        },
        {
          photo: 'IMG_1454.JPG',
          item_id: 56,
        },
        {
          photo: 'IMG_1455.JPG',
          item_id: 56,
        },
        {
          photo: 'IMG_1456.JPG',
          item_id: 56,
        },
        {
          photo: 'IMG_1477.JPG',
          item_id: 57,
        },
        {
          photo: 'IMG_1478.JPG',
          item_id: 57,
        },
        {
          photo: 'IMG_1484.JPG',
          item_id: 57,
        },
        {
          photo: 'IMG_1477.JPG',
          item_id: 58,
        },
        {
          photo: 'IMG_1478.JPG',
          item_id: 58,
        },
        {
          photo: 'IMG_1484.JPG',
          item_id: 58,
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
