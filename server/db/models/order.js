const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'user_id' });
      this.belongsToMany(models.Item, {
        through: models.OrderItem,
        foreignKey: 'order_id',
      });
    }
  }

  Order.init(
    {
      user_id: DataTypes.INTEGER,
      status: {
        type: DataTypes.TEXT,
        defaultValue: 'Заказ создан',
      },
      urgent: DataTypes.BOOLEAN,
      address: DataTypes.TEXT,
      payment_type: DataTypes.TEXT,
      total: DataTypes.INTEGER,
      prepayment: DataTypes.INTEGER,
      residual_amount: {
        type: DataTypes.VIRTUAL(DataTypes.INTEGER),
        get() {
          return this.getDataValue('total') - this.getDataValue('prepayment');
        },
      },
      comments: DataTypes.TEXT,
      admin_comments: {
        type: DataTypes.TEXT,
        defaultValue: 'Комментарии к заказам',
      },
      getReadyAt: DataTypes.DATE,
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      },
    },
    {
      sequelize,
      modelName: 'Order',
    },
  );

  return Order;
};
