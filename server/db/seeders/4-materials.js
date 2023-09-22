/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Materials',
      [
        {
          name: 'Коричневый - состав: 98% хлопка и 2% спандекс',
          photo: 'IMG_1378.JPG',
          category_id: 1,
        },
        {
          name: 'Бежевый - состав: 98% хлопка и 2% спандекс',
          photo: 'IMG_1376.JPG',
          category_id: 1,
        },
        {
          name: 'Серый - состав: 98% хлопка и 2% спандекс',
          photo: 'IMG_1377.JPG',
          category_id: 1,
        },
        {
          name: 'Черная эко-кожа - состав: 40% полиэстер, 60% - полиуретановое покрытие',
          photo: 'IMG_1379.JPG',
          category_id: 2,
        },
        {
          name: 'Коричневая эко-кожа - состав: 40% полиэстер, 60% - полиуретановое покрытие',
          photo: 'brownLeather.JPG',
          category_id: 2,
        },
        {
          name: 'Кэмел - состав: 75% шерсть и 25% нейлон',
          photo: 'IMG_1406.JPG',
          category_id: 3,
        },
        {
          name: 'Песочный - состав: шерсть 55%, альпака 15%, 30% полиэстер',
          photo: 'IMG_1407.JPG',
          category_id: 3,
        },
        {
          name: 'Баклажановый - состав: 75% шерсть и 25% нейлон',
          photo: 'IMG_1408.JPG',
          category_id: 3,
        },
        {
          name: 'Светлый меланж - состав: 95% шерсть и 5% вискоза',
          photo: 'IMG_1409.JPG',
          category_id: 3,
        },
        {
          name: 'Темный меланж - состав: 95% шерсть и 5% вискоза',
          photo: 'IMG_1410.JPG',
          category_id: 3,
        },
        {
          name: 'Черный - состав: 95% шерсть и 5% вискоза',
          photo: 'IMG_1411.JPG',
          category_id: 3,
        },
        {
          name: 'Пудровый - состав: 50% Акрил, 50% Нейлон',
          photo: 'IMG_1412.JPG',
          category_id: 4,
        },
        {
          name: 'Мокко - состав: 50% Акрил, 50% Нейлон',
          photo: 'IMG_1414.JPG',
          category_id: 4,
        },
        { name: 'Синий меланж', photo: 'IMG_1467.JPG', category_id: 5 },
        { name: 'Глубокий синий', photo: 'IMG_1468.JPG', category_id: 5 },
        { name: 'Синий рубчик', photo: 'IMG_1469.JPG', category_id: 5 },
        { name: 'Молочный', photo: 'IMG_1471.JPG', category_id: 5 },
        {
          name: 'Серый в синюю полоску',
          photo: 'IMG_1491.JPG',
          category_id: 5,
        },
        { name: 'Черный', photo: 'IMG_1492.JPG', category_id: 5 },
        {
          name: 'Черная эко-кожа - состав: 40% полиэстер, 60% - полиуретановое покрытие',
          photo: 'IMG_1379.JPG',
          category_id: 6,
        },
        {
          name: 'Коричневая эко-кожа - состав: 40% полиэстер, 60% - полиуретановое покрытие',
          photo: 'brownLeather.JPG',
          category_id: 6,
        },
        { name: 'Синий меланж', photo: 'IMG_1467.JPG', category_id: 7 },
        { name: 'Глубокий синий', photo: 'IMG_1468.JPG', category_id: 7 },
        { name: 'Синий рубчик', photo: 'IMG_1469.JPG', category_id: 7 },
        { name: 'Молочный', photo: 'IMG_1471.JPG', category_id: 7 },
        {
          name: 'Серый в синюю полоску',
          photo: 'IMG_1491.JPG',
          category_id: 7,
        },
        { name: 'Черный', photo: 'IMG_1492.JPG', category_id: 7 },
        { name: 'Синий меланж', photo: 'IMG_1467.JPG', category_id: 8 },
        { name: 'Глубокий синий', photo: 'IMG_1468.JPG', category_id: 8 },
        { name: 'Синий рубчик', photo: 'IMG_1469.JPG', category_id: 8 },
        { name: 'Молочный', photo: 'IMG_1471.JPG', category_id: 8 },
        {
          name: 'Серый в синюю полоску',
          photo: 'IMG_1491.JPG',
          category_id: 8,
        },
        { name: 'Черный', photo: 'IMG_1492.JPG', category_id: 8 },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Materials', null, {});
  },
};
