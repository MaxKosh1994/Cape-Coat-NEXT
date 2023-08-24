const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Material extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Category, { foreignKey: 'category_id' });
      this.hasMany(models.Item, { foreignKey: 'material_id' });
    }
  }
  Material.init(
    {
      name: DataTypes.STRING,
      photo: DataTypes.STRING,
      category_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Material',
    },
  );
  return Material;
};
