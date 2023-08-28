const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Promocode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.User, {
        through: models.UserPromocode,
        foreignKey: 'promocode_id',
      });
    }
  }
  Promocode.init(
    {
      code: DataTypes.STRING,
      percent: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Promocode',
    },
  );
  return Promocode;
};
