'use strict';
module.exports = function(sequelize, DataTypes) {
  var Skills = sequelize.define('Skills', {
    id: {
      unique: true,
      primaryKey: true,
      type: DataTypes.UUID,
      validate: { isUUID: 4 },
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
        unique: true,
        allowNull: false,
        type: DataTypes.STRING,
    },
    slug: {
        unique: true,
        allowNull: false,
        type: DataTypes.STRING,
    },
    UserId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    RevisionId: {
      allowNull: false,
      type: DataTypes.UUID
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
    // TODO do we even use this?
    rating: {
      allowNull: false,
      defaultValue: 0,
      type: DataTypes.INTEGER,
    },
  }, {
    classMethods: {
      tableName: 'skills',
      freezeTableName: true,
      associate: function(models) {
        Skills.belongsTo(models.User, {
          // onDelete: "CASCADE", // TODO implement this?
          foreignKey: {
            allowNull: false
          }
        });
        Skills.hasMany(models.Revisions)
      },
      findIdBySlug: function(slug) {
        return Skills
                .findOne({ where: { slug } })
                .then(skill => skill && skill.get('id'))
      }
    }
  });
  return Skills;
};