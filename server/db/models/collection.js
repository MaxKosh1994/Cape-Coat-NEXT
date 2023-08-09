const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Collection extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Item, { foreignKey: 'collection_id' });
      this.hasMany(models.LookBookPhoto, { foreignKey: 'collection_id' });
    }
  }
  Collection.init(
    {
      name: DataTypes.STRING,
      photo: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Collection',
    },
  );
  return Collection;
};
