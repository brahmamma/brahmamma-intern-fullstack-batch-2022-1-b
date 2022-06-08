'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.bulkInsert('orders', [
     {
       id:1,
       user_id:3,
       product_id:2,
       delivered_status:false,
       driver_id:2,
       ordered_at:new Date()
     },
     {
      id:2,
      user_id:4,
      product_id:1,
      delivered_status:false,
       driver_id:2,
       ordered_at:new Date()
    },
    {
      id:3,
      user_id:4,
      product_id:2,
      deliverred_status:false,
       driver_id:2,
       ordered_at:new Date()
    }
    ], {});
   
  },

  async down (queryInterface, Sequelize) {
   
     await queryInterface.bulkDelete('orders', null, {});
    
  }
};
