/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OrderItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      order_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Orders',
          },
          key: 'id',
        },
      },
      item_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Items',
          },
          key: 'id',
        },
      },
      selected_material: {
        type: Sequelize.TEXT,
      },
      height: {
        type: Sequelize.TEXT,
      },
      length: {
        type: Sequelize.TEXT,
      },
      sleeve: {
        type: Sequelize.TEXT,
      },
      bust: {
        type: Sequelize.TEXT,
      },
      waist: {
        type: Sequelize.TEXT,
      },
      hips: {
        type: Sequelize.TEXT,
      },
      saddle: {
        type: Sequelize.TEXT,
      },
      loops: {
        type: Sequelize.BOOLEAN,
      },
      buttons: {
        type: Sequelize.TEXT,
      },
      lining: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('OrderItems');
  },
};
