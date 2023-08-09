const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class LookBookPhoto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Collection, { foreignKey: 'collection_id' });
    }
  }
  LookBookPhoto.init(
    {
      photo: DataTypes.STRING,
      collection_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'LookBookPhoto',
    },
  );
  return LookBookPhoto;
};
