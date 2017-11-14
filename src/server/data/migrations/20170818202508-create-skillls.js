'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('skills', {
      id: {
        unique: true,
        primaryKey: true,
        type: Sequelize.UUID,
        validate: { isUUID: 4 },
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        unique: true,
        allowNull: false,
        type: Sequelize.STRING,
      },
      slug: {
        unique: true,
        allowNull: false,
        type: Sequelize.STRING,
      },
      UserId: {
        allowNull: false,
        type: Sequelize.INTEGER
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
      RevisionId: {
        allowNull: false,
        type: Sequelize.UUID
      },
      rating: {
        allowNull: false,
        defaultValue: 0,
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
    return queryInterface.dropTable('skills');
  }
};