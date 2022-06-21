'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orderstatuses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING,
        allowNull:false,
        unique:true
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('orderstatuses');
  }
};