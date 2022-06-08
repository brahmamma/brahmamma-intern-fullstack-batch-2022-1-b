'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.bulkInsert('categories', [
       {
         id:1,
         category:'women clothes',
         createdAt:new Date(),
        updatedAt:new Date()
       },
       {
        id:2,
        category:'kids clothes',
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        id:3,
        category:'men clothes',
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        id:4,
        category:'Electronics',
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        id:5,
        category:'Home Decors',
        createdAt:new Date(),
        updatedAt:new Date()
      }
     ], {});
    
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('categories', null, {});
    
  }
};
