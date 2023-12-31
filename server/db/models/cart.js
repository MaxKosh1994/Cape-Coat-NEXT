const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'user_id' });
      this.belongsToMany(models.Item, {
        through: models.CartItem,
        foreignKey: 'cart_id',
        onDelete: 'cascade',
      });
    }
  }
  Cart.init(
    {
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Cart',
    },
  );
  return Cart;
};
