/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CartItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      cart_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Carts',
          },
          key: 'id',
        },
        onDelete: 'CASCADE',
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
      added: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable('CartItems');
  },
};
