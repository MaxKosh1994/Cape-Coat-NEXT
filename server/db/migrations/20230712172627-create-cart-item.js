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
        defaultValue: '',
      },
      length: {
        type: Sequelize.TEXT,
        defaultValue: '',
      },
      sleeve: {
        type: Sequelize.TEXT,
        defaultValue: '',
      },
      bust: {
        type: Sequelize.TEXT,
        defaultValue: '',
      },
      waist: {
        type: Sequelize.TEXT,
        defaultValue: '',
      },
      hips: {
        type: Sequelize.TEXT,
        defaultValue: '',
      },
      saddle: {
        type: Sequelize.TEXT,
        defaultValue: '',
      },
      loops: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      buttons: {
        type: Sequelize.TEXT,
        defaultValue: '',
      },
      lining: {
        type: Sequelize.TEXT,
        defaultValue: '',
      },
      added: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
