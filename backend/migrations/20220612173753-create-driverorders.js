'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('driverorders', {
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
      order_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'allorders',
          key:'id'
        }
      },
      delivered_status:{
        type:Sequelize.BOOLEAN,
        allowNull:false,
        
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('driverorders');
  }
};