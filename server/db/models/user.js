const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Order, { foreignKey: 'user_id' });
      this.hasMany(models.Cart, { foreignKey: 'user_id' });
      this.belongsToMany(models.Item, {
        through: models.Favorite,
        foreignKey: 'user_id',
      });
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      phone: DataTypes.STRING,
      full_name: DataTypes.STRING,
      address: DataTypes.STRING,
      telegram_instagram: DataTypes.STRING,
      admin: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
