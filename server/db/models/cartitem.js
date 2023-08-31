const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Item, {
        foreignKey: 'item_id',
        onDelete: 'cascade',
      });
    }
  }
  CartItem.init(
    {
      cart_id: DataTypes.INTEGER,
      item_id: DataTypes.INTEGER,
      selected_material: DataTypes.TEXT,
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
      added: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'CartItem',
    },
  );
  return CartItem;
};
