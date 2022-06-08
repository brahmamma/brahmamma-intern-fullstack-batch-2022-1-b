'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('carts', [
      {
        id:1,
        user_id:3,
        product_id:2
      },
      {
       id:2,
       user_id:4,
       product_id:1
     },
     {
       id:3,
       user_id:4,
       product_id:2
     }
     ], {});
    
  },

  async down (queryInterface, Sequelize) {
   
     await queryInterface.bulkDelete('carts', null, {});
    
  }
};
