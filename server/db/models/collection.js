const fs = require('fs').promises;
const path = require('path');

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
      description: DataTypes.TEXT,
      urlName: DataTypes.STRING,
      current: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Collection',
    },
  );

  Collection.afterUpdate(async (collection, options) => {
    const previousData = collection._previousDataValues;
    if (previousData.photo && previousData.photo !== collection.photo) {
      try {
        const filePath = path.join(
          process.cwd(),
          `storage/collection/${previousData.photo}`,
        );
        await fs.unlink(filePath);
        console.log('The avatar has been deleted');
      } catch (error) {
        console.error('Error deleting the avatar:', error);
      }
    }
  });

  Collection.afterDestroy(async (collection, options) => {
    try {
      const filePath = path.join(
        process.cwd(),
        `storage/collection/${collection.photo}`,
      );
      await fs.unlink(filePath);
      console.log('The photo has been deleted');
    } catch (error) {
      console.error('Error deleting the photo:', error);
    }
  });
  return Collection;
};
