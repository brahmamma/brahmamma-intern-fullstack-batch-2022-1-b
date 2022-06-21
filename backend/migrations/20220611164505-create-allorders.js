'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('allorders', {
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
        type: Sequelize.BOOLEAN,
        allowNull:false,
      },
      ordered_at: {
        type: Sequelize.DATE,
        allowNull:false,
      },
      order_amount: {
        type: Sequelize.BIGINT,
        allowNull:false
      },
      order_status: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'orderstatuses',
          key:'id'
        }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('allorders');
  }
};