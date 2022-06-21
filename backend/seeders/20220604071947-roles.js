'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('roles', [
      {
        id:1,
        role:'admin',
       
      },
      {
        id:2,
        role:'driver',
       
      },
      {
        id:3,
        role:'user',
       
      }

    ], {});
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('roles', null, {});
  }
};
