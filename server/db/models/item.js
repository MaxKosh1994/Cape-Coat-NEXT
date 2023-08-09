const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Collection, { foreignKey: 'collection_id' });
      this.belongsTo(models.Category, { foreignKey: 'category_id' });
      this.belongsTo(models.Material, { foreignKey: 'material_id' });
      this.belongsToMany(models.Order, {
        through: models.OrderItem,
        foreignKey: 'item_id',
      });
      this.belongsToMany(models.Cart, {
        through: models.CartItem,
        foreignKey: 'item_id',
      });
      this.belongsToMany(models.User, {
        through: models.Favorite,
        foreignKey: 'item_id',
      });
      this.hasMany(models.Photo, { foreignKey: 'item_id' });
    }
  }
  Item.init(
    {
      name: DataTypes.STRING,
      article: DataTypes.INTEGER,
      description: DataTypes.STRING,
      model_params: DataTypes.STRING,
      characteristics: DataTypes.STRING,
      price: DataTypes.INTEGER,
      new_price: DataTypes.INTEGER,
      color: DataTypes.STRING,
      in_stock: DataTypes.BOOLEAN,
      bestseller: DataTypes.BOOLEAN,
      collection_id: DataTypes.INTEGER,
      material_id: DataTypes.INTEGER,
      category_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Item',
    },
  );
  return Item;
};
