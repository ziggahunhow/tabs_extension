'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addIndex(
      'Users', // name of Source model
      ['email'],
      {
        validate: {
          isEmail: true,
          notEmpty: true
        }
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeIndex(
      'Users', // name of Source model
      'email',
      {
        validate: {
          isEmail: true,
          notEmpty: true
        }
      }
    );
  }
};
