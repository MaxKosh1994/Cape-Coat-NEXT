const fs = require('fs').promises;
const path = require('path');
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Item, { foreignKey: 'category_id' });
      this.hasMany(models.Material, { foreignKey: 'category_id' });
    }
  }
  Category.init(
    {
      name: DataTypes.STRING,
      photo: DataTypes.STRING,
      urlName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Category',
    },
  );

  Category.afterUpdate(async (category, options) => {
    const previousData = category._previousDataValues;
   if (
     previousData.photo &&
     previousData.photo !== category.photo
   ) {
     try {
       const filePath = path.join(process.cwd(), `storage/category/${previousData.photo}`);
       await fs.unlink(filePath);
       console.log('The avatar has been deleted');
     } catch (error) {
       console.error('Error deleting the avatar:', error);
     }
   }
  });

  Category.afterDestroy(async (category, options) => {
    try {
      console.log('Category:', category);
      const filePath = path.join(
        process.cwd(),
        `storage/category/${category.photo}`,
      );
      await fs.unlink(filePath);
      console.log('The photo has been deleted');
    } catch (error) {
      console.error('Error deleting the photo:', error);
    }
  });

  return Category;
};
