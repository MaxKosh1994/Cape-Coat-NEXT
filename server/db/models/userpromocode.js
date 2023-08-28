'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserPromocode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserPromocode.init({
    user_id: DataTypes.NUMBER,
    promocode_id: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'UserPromocode',
  });
  return UserPromocode;
};