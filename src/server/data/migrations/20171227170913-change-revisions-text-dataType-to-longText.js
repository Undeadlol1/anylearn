'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'revisions',
      'text',
      {
        allowNull: false,
        type: Sequelize.TEXT('long'),
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'revisions',
      'text',
      {
        allowNull: false,
        type: Sequelize.TEXT('long'),
      }
    )
  }
};
