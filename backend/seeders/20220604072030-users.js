'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        id:1,
        name:'brahmi',
        email:'brahmi@gmail.com',
        phonenumber:9876543210,
        password:'123',
        role_id:1
      },
      {
        id:2,
        name:'Nikhil',
        email:'ikhi5@gmail.com',
        phonenumber:7643789208,
        password:'nikhi',
        role_id:2
      },
      {
        id:3,
        name:'neeraj',
        email:'neeraj@gmail.com',
        phonenumber:98765437650,
        password:'neeraj4',
        role_id:3
      },
      {
        id:4,
        name:'mohana',
        email:'mohana@gmail.com',
        phonenumber:98787543210,
        password:'mohana',
        role_id:3
      },
      {
        id:5,
        name:'vasu',
        email:'vasu@gmail.com',
        phonenumber:9876556210,
        password:'vasu123',
        role_id:2
      },
      
    ], {});
    


  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('users', null, {});
  }
};
