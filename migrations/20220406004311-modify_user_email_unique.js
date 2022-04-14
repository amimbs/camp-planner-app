'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addConstraint(
      'users', {
      fields: ['useremail'],
      type: 'unique',
      name: 'unique_constraint_email'
    });

    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
