module.exports = {
  async up(queryInterface, Sequelize) {
    const orders = [];

    for (let i = 0; i < 24; i++) {
      const month = Math.ceil((i + 1) / 4);
      const date = new Date(2023, month);
      const getReadyAt = new Date(
        date.getTime() + Math.random() * 10 * 24 * 60 * 60 * 1000,
      );

      orders.push({
        user_id: 1,
        status: 'Заказ создан',
        address: 'Улица Академика Пилюгина, дом 1, кв 777',
        total: 15400,
        comments: 'Сделайте красиво!',
        getReadyAt,
        createdAt: date,
        updatedAt: date,
      });
    }

    return queryInterface.bulkInsert('Orders', orders, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Orders', null, {});
  },
};
