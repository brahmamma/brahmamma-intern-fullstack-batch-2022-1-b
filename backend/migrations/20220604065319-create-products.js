'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull:false
      },
      description: {
        type: Sequelize.STRING,
        allowNull:false
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'categories',
          key:'id'
        }
      },
      price: {
        type: Sequelize.BIGINT,
        allowNull:false
      },
      image: {
        type: Sequelize.STRING,
        allowNull:false
      },
      available_status: {
        type: Sequelize.BOOLEAN,
        allowNull:false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  }
};