// "use strict";

// const { faker } = require('@faker-js/faker');

// module.exports = {
//   async up(queryInterface, Sequelize) {
//     let camp_plans =[];
    
//     for (let i = 0; i < 10; i++) {
//       camp_plans.push({
//         user_id: 1,
//         name: faker.random.locale(),
//         date: faker.date.past(),
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       })
//     }
//     await queryInterface.bulkDelete("Camp-Plans", camp_plans)
//   },

//   async down(queryInterface, Sequelize) {
    
//     },
  
// };
