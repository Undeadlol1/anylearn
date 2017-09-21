'use strict';
module.exports = function(sequelize, DataTypes) {
  var Revisions = sequelize.define('Revisions', {
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
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        isUrl: true,
        notNull: true,
        notEmpty: true,
      }
    },
    parentId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    previousId: {
      allowNull: true, // ?????
      type: DataTypes.INTEGER,
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