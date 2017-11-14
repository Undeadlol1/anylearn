'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('revisions', {
      id: {
        unique: true,
        primaryKey: true,
        type: Sequelize.UUID,
        validate: { isUUID: 4 },
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      description: {
          allowNull: true,
          type: Sequelize.STRING,
      },
      UserId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      active: {
        allowNull: false,
        defaultValue: true,
        type: Sequelize.BOOLEAN,
      },
      // TODO do we need this?
      image: {
        allowNull: true,
        type: Sequelize.STRING,
        validate: {
          isUrl: true,
          notEmpty: true,
        }
      },
      parentId: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      previousId: {
        allowNull: true, // ?????
        type: Sequelize.UUID,
      },
      // TODO do we need this?
      rating: {
        defaultValue: 0,
        allowNull: false,
        type: Sequelize.INTEGER,
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
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('revisions');
  }
};