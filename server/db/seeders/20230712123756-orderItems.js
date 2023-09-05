/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const orderItems = [];

    for (let i = 0; i < 12; i++) {
      orderItems.push({
        order_id: i + 1,
        selected_material: 'Дефолтный материал',
        height: '180',
        length: '100',
        sleeve: '40',
        bust: '90',
        waist: '60',
        hips: '90',
        saddle: '',
        loops: true,
        buttons: 'knopki',
        lining: '',
        item_id: i + 1,
      });
      orderItems.push({
        order_id: i + 1,
        selected_material: 'Дефолтный материал 2',
        height: '180',
        length: '100',
        sleeve: '40',
        bust: '90',
        waist: '60',
        hips: '90',
        saddle: '',
        loops: true,
        buttons: 'knopki',
        lining: '',
        item_id: i + 2,
      });
    }

    return queryInterface.bulkInsert('OrderItems', orderItems, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('OrderItems', null, {});
  },
};
