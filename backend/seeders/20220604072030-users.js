'use strict';
var bcrypt=require('bcrypt');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        id:1,
        name:'brahmi',
        email:'brahmammac148@gmail.com',
        phonenumber:6303322413,
        password:bcrypt.hashSync('brahmiC735@',6),
        role_id:1
      },
      
      
    ], {});
    


  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('users', null, {});
  }
};
