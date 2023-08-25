const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  OrderItem.init(
    {
      order_id: DataTypes.INTEGER,
      item_id: DataTypes.INTEGER,
      height: DataTypes.TEXT,
      length: DataTypes.TEXT,
      sleeve: DataTypes.TEXT,
      bust: DataTypes.TEXT,
      waist: DataTypes.TEXT,
      hips: DataTypes.TEXT,
      saddle: DataTypes.TEXT,
      loops: DataTypes.BOOLEAN,
      buttons: DataTypes.TEXT,
      lining: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'OrderItem',
    },
  );
  return OrderItem;
};
