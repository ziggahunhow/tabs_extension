'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Bookmarks', // name of Source model
      'favIconUrl', // name of the key we're adding
      {
        type: Sequelize.STRING
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Bookmarks', // name of Source model
      'favIconUrl' // key we want to remove
    );
  }
};
