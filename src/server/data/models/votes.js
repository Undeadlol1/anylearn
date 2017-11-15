'use strict';
module.exports = function(sequelize, DataTypes) {
  var Votes = sequelize.define('Votes', {
    id: {
      unique: true,
      primaryKey: true,
      type: DataTypes.UUID,
      validate: { isUUID: 4 },
      defaultValue: DataTypes.UUIDV4,
    },
    choice: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
    UserId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    parentId: {
      allowNull: false,
      type: DataTypes.UUID
    }
  }, {
    classMethods: {
      tableName: 'votes',
      freezeTableName: true,
      associate: function(models) {
        Votes.belongsTo(models.User, {
          // onDelete: "CASCADE", // TODO implement this?
          foreignKey: {
            allowNull: false
          }
        });
        // Votes.hasOne(models.Skills)
        // Votes.hasOne(models.Revisions)
      }
    }
  });
  return Votes;
};