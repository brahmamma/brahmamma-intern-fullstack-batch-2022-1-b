'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:'users',
          key:'id'
        }
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:'products',
          key:'id'
        }
      },
      address_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:'addresses',
          key:'id'
        }
      },
      driver_id: {
        type: Sequelize.INTEGER,
        references:{
          model:'users',
          key:'id'
        }
      },
      delivered_status: {
        allowNull:false,
        type: Sequelize.BOOLEAN
      },
      ordered_at: {
        type: Sequelize.DATE,
        allowNull:false
      },
      quantity:{
        type:Sequelize.INTEGER,
        allowNull:false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('orders');
  }
};