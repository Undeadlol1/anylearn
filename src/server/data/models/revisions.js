'use strict';
module.exports = function(sequelize, DataTypes) {
  var Revisions = sequelize.define('Revisions', {
    id: {
      unique: true,
      primaryKey: true,
      type: DataTypes.UUID,
      validate: { isUUID: 4 },
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    description: {
        allowNull: true,
        type: DataTypes.STRING,
    },
    UserId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    active: {
      allowNull: false,
      defaultValue: true,
      type: DataTypes.BOOLEAN,
    },
    // TODO do we need this?
    image: {
      allowNull: true,
      type: DataTypes.STRING,
      validate: {
        isUrl: true,
        notEmpty: true,
      }
    },
    parentId: {
      allowNull: false,
      type: DataTypes.UUID,
    },
    previousId: {
      allowNull: true, // ?????
      type: DataTypes.UUID,
    },
    // TODO do we need this?
    rating: {
      defaultValue: 0,
      allowNull: false,
      type: DataTypes.STRING,
    },
  }, {
    classMethods: {
      tableName: 'revisions',
      freezeTableName: true,
      associate: function(models) {
        Revisions.belongsTo(models.User, {
          // onDelete: "CASCADE", // TODO implement this?
          foreignKey: {
            allowNull: false
          }
        });
        Revisions.hasOne(models.Skills)
      },
      // TODO
      findIdBySlug: function(slug) {
        return Revisions
                .findOne({ where: { slug } })
                .then(revision => revision && revision.get('id'))
      }
    }
  });
  return Revisions;
};