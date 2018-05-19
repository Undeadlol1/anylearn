'use strict';
module.exports = function(sequelize, DataTypes) {
  var Revisions = sequelize.define('Revisions', {
    id: {
      unique: true,
      primaryKey: true,
      type: DataTypes.UUID,
      validate: { isUUID: 4 },
      comment: 'Unique identifier.',
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING,
        comment: 'Short comment about made change.',
    },
    text: {
        allowNull: false,
        type: DataTypes.TEXT('long'),
        comment: 'Full text of changed document.',
    },
    description: {
        allowNull: true,
        type: DataTypes.STRING,
        comment: 'Long comment about made change.',
    },
    UserId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      comment: 'Unique id of a user who created this revision.',
    },
    active: {
      allowNull: false,
      defaultValue: true,
      type: DataTypes.BOOLEAN,
      comment: 'Is this revision revision the current one or not.',
    },
    // TODO do we need this?
    image: {
      allowNull: true,
      type: DataTypes.STRING,
      comment: 'Besides text revisions can also change images.',
      // validate: {
      //   isUrl: true,
      //   notEmpty: true,
      // }
    },
    parentId: {
      allowNull: false,
      type: DataTypes.UUID,
      // TODO: add validate: UUID/v4
      comment: 'Unique identifier of parent document. Most likely id of a skill.',
    },
    previousId: {
      allowNull: true, // ?????
      type: DataTypes.UUID,
      comment: 'Id of previous revision. This is needed to be able to cycle through revisions.',
    },
    // TODO do we need this?
    rating: {
      defaultValue: 0,
      allowNull: false,
      type: DataTypes.STRING,
      comment: 'The amount of likes/dislikes revision has.',
    },
  }, {
      tableName: 'revisions',
      freezeTableName: true,
  });
  // Class Methods.
  Revisions.associate = function (models) {
      Revisions.belongsTo(models.User, {
        // onDelete: "CASCADE", // TODO implement this?
        foreignKey: {
          allowNull: false,
        }
      });
      Revisions.belongsTo(models.Skills, {
        foreignKey: 'parentId',
      })
  }
  Revisions.findIdBySlug = function (slug) {
    return Revisions
      .findOne({where: {slug}})
      .then(revision => revision && revision.get('id'))
  }
  return Revisions;
};