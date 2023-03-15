'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Food_Truck', {
      type: 'unique',
      fields: ['Name','Date'],
      name: 'unique_name_constraint'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('users', 'unique_email_constraint');
  }
};
