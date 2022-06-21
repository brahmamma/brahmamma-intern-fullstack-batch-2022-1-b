'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('allroutes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      driver_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'users',
          key:'id'
        }
      },
      visited_status: {
        allowNull:false,
        type: Sequelize.BOOLEAN
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('allroutes');
  }
};