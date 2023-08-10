const bcrypt = require('bcrypt');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashPassword = await bcrypt.hash('123', 10);
    const hashPassword1 = await bcrypt.hash('1', 10);
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          email: 'biba@biba.ru',
          password: hashPassword,
          phone: '89505558888',
          full_name: 'бибус',
          address: 'бирибус',
          telegram: '@',
          admin: false,
        },
        {
          email: 'fake@gmail.com',
          password: hashPassword,
          phone: '89505558888',
          full_name: 'юзер2',
          address: 'улица бассейная',
          telegram: '@biba',
          admin: false,
        },
        {
          email: '1@1.ru',
          password: hashPassword1,
          phone: '89505558888',
          full_name: 'Алена или Паша',
          address: 'Ницца',
          telegram: '@user3',
          admin: false,
        },
        {
          email: 'max@gmail.com',
          password: hashPassword,
          phone: '89505558888',
          full_name: 'Max',
          address: 'кокойто адрес',
          telegram: '@user4',
          admin: false,
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
