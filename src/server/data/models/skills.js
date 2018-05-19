'use strict';
module.exports = function(sequelize, DataTypes) {
  var Skills = sequelize.define('Skills', {
    id: {
      unique: true,
      primaryKey: true,
      type: DataTypes.UUID,
      validate: { isUUID: 4 },
      comment: 'Unique identifier.',
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
        unique: true,
        allowNull: false,
        type: DataTypes.STRING,
        comment: 'Human readable name for a skill.',
    },
    slug: {
        unique: true,
        allowNull: false,
        type: DataTypes.STRING,
        comment: 'Url friendly name of a skill.',
    },
    UserId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      comment: 'Unique id of a user who created this skill.',
    },
    RevisionId: {
      allowNull: false,
      type: DataTypes.UUID,
      comment: 'Id of current active revision. Probably not used ATM.',
    },
    // TODO do we need this?
    image: {
      allowNull: true,
      type: DataTypes.STRING,
      comment: 'This skills image url.',
    },
    // TODO do we even use this?
    rating: {
      allowNull: false,
      defaultValue: 0,
      type: DataTypes.INTEGER,
      comment: 'The amount of likes/dislikes this document have.',
    },
  }, {
      tableName: 'skills',
      freezeTableName: true,
      defaultScope: {
        include: [{
          where: {active: true},
          model: require('./index').Revisions,
        }],
      }
  });
  // Class Methods.
  Skills.associate = function (models) {
      Skills.belongsTo(models.User, {
        // onDelete: "CASCADE", // TODO implement this?
        foreignKey: {
          allowNull: false,
        }
      });
      Skills.hasMany(models.Revisions, {
        sourceKey: 'id',
        foreignKey: 'parentId',
      })
  }
  Skills.findIdBySlug = function (slug) {
    return Skills
      .findOne({where: {slug}})
      .then(skill => skill && skill.get('id'))
  }
  return Skills;
};