/* eslint-disable no-unused-vars */
const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Book.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'userId',
      });
      Book.belongsTo(models.Category, {
        as: 'category',
        foreignKey: 'categoryId',

      });
      Book.belongsTo(models.Author, {
        as: 'author',
        foreignKey: 'authorId',
      });
      Book.hasMany(models.Image, {
        as: 'images',
        foreignKey: 'bookId',
      });
    }
  }
  Book.init({
    title: DataTypes.STRING,
    descriptors: DataTypes.TEXT,
    publisher: DataTypes.TEXT,
    rentPrice: DataTypes.FLOAT,
    buyPrice: DataTypes.FLOAT,
    userId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};
