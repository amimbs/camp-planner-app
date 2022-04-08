'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('gear_lists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      gear_item: {
        type: Sequelize.STRING
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      camp_plan_id: {
        type: Sequelize.INTEGER,
        references:{
          model: "camp_plans",
          key: "id",
        },allowNull:false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('gear_lists');
  }
};