/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Users',
          },
          key: 'id',
        },
      },
      status: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: 'Заказ создан',
      },
      urgent: {
        type: Sequelize.BOOLEAN,
      },
      address: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      payment_type: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      total: {
        type: Sequelize.INTEGER,
      },
      prepayment: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      comments: {
        type: Sequelize.TEXT,
      },
      admin_comments: {
        type: Sequelize.TEXT,
        defaultValue: 'Комментарии к заказам',
      },
      getReadyAt: {
        allowNull: true,
        type: Sequelize.DATE,
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
    await queryInterface.dropTable('Orders');
  },
};
