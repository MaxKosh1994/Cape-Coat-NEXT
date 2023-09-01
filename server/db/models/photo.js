'use strict';
const fs = require('fs').promises;
const path = require('path');
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Item, { foreignKey: 'item_id' });
    }
  }
  Photo.init(
    {
      photo: DataTypes.STRING,
      item_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Photo',
    },
  );

  Photo.afterDestroy(async (photo, options) => {
    try {
      const filePath = path.join(
        process.cwd(),
        `storage/items/${photo.photo}`,
      );
      await fs.unlink(filePath);
      console.log('The photo has been deleted');
    } catch (error) {
      console.error('Error deleting the photo:', error);
    }
  });


  return Photo;
};
