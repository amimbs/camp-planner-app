// "use strict";

// const { faker } = require('@faker-js/faker');

// module.exports = {
//   async up(queryInterface, Sequelize) {
    
//     let gear_lists =[];

//       for (let i = 0; i < 10; i++) {
//         gear_lists.push({
//           gear_item: faker.commerce.product(),
//           quantity: faker.phone.phoneNumber(),
//           camp_plan_id: 1,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         })
//       }
//       await queryInterface.bulkDelete("Gear-Lists", gear_lists)
//     },

//   async down(queryInterface, Sequelize) {
   
    
//   },
// };
