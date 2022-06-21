'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('routes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      route_id: {
        allowNull:false,
        type: Sequelize.INTEGER,
        references: {
          model: 'allroutes',
          key: 'id'
        }
      },
      order_id: {
        allowNull:false,
        type: Sequelize.INTEGER,
        references:{
          model:'allorders',
          key:'id'
        }
      },
      address: {
        allowNull:false,
        type: Sequelize.STRING
      },
      flag: {
        allowNull:false,
        type: Sequelize.BOOLEAN
      },
      distance: {
        allowNull:false,
        type: Sequelize.STRING
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('routes');
  }
};