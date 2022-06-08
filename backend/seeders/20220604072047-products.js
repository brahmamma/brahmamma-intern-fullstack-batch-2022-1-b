'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   
     await queryInterface.bulkInsert('products', [
      {
        id:1,
        category_id:1,
        price:500,
        available_status:true,
        image:'kkk',

      },
      {
        id:2,
        category_id:3,
        price:700,
        available_status:true,
        image:'oooo',

      },
      {
        id:3,
        category_id:1,
        price:200,
        available_status:true,
        image:'aaa',

      },
      {
        id:4,
        category_id:2,
        price:1700,
        available_status:true,
        image:'eee',

      } 
     ], {});
    
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('products', null, {});
  }
};
