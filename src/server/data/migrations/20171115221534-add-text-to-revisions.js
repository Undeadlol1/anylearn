'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return  queryInterface.addColumn('revisions', 'text',
      {
        allowNull: false,
        type: Sequelize.TEXT,
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    return  queryInterface.removeColumn('revisions', 'text')
  }
};
