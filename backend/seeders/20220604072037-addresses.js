'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('addresses', [
      {
        id:1,
        user_id:3,
        hno:'4-987',
        village:'Tallapalli',
        mandal:'macherla',
        district:'Guntur',
        state:'Andra Pradesh',
        pincode:522426
      },
      {
        id:2,
        user_id:4,
        hno:'4-953',
        village:'7th Mile',
        mandal:'macherla',
        district:'Guntur',
        state:'Andra Pradesh',
        pincode:522426
      },
      {
        id:3,
        user_id:3,
        hno:'2-345',
        village:'Nuzvid',
        mandal:'Nuzvid',
        district:'Krishnna',
        state:'Andra Pradesh',
        pincode:522201
      },
      {
        id:4,
        user_id:3,
        hno:'982',
        village:'Nunna',
        mandal:'Vijayawada',
        district:'Krishnna',
        state:'Andra Pradesh',
        pincode:522234
      }
      
      
    ], {});
    
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('addresses', null, {});
  }
};
