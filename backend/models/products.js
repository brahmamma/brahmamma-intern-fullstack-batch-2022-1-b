'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  products.init({
    category_id: DataTypes.INTEGER,
    name:DataTypes.STRING,
    description:DataTypes.STRING,
    price: DataTypes.INTEGER,
    image: DataTypes.STRING,
    available_status: DataTypes.BOOLEAN,
    delete_status: DataTypes.BOOLEAN
  }, {
    timestamps:false,
    sequelize,
    modelName: 'products',
  });
  return products;
};