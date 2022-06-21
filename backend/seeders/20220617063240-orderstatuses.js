'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.bulkInsert('orderstatuses', [{
     id:1,
     status:'Pending'
     },
     {
      id:2,
      status:'Accepted'
     },
     {
       id:3,
      status:'Out for Delivery'},
    { 
      id:4,
      status:'Delivered'},
    { 
      id:5,
      status:'Cancelled'}
    ], {});
    
  },

  async down (queryInterface, Sequelize) {
    
      await queryInterface.bulkDelete('orderstatuses', null, {});
    
  }
};
