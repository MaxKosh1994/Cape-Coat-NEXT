const fs = require('fs').promises;
const path = require('path');

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

  Material.afterUpdate(async (material, options) => {
    const previousData = material._previousDataValues;
    if (previousData.photo && previousData.photo !== material.photo) {
      try {
        const filePath = path.join(
          process.cwd(),
          `storage/materials/${previousData.photo}`,
        );
        await fs.unlink(filePath);
        console.log('The photo has been deleted');
      } catch (error) {
        console.error('Error deleting the photo:', error);
      }
    }
  });

  Material.afterDestroy(async (material, options) => {
    try {
      const filePath = path.join(
        process.cwd(),
        `storage/materials/${material.photo}`,
      );
      await fs.unlink(filePath);
      console.log('The photo has been deleted');
    } catch (error) {
      console.error('Error deleting the photo:', error);
    }
  });
  return Material;
};
