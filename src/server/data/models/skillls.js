'use strict';
module.exports = function(sequelize, DataTypes) {
  var Skills = sequelize.define('Skills', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        // TODO index
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        // TODO index
    },
    UserId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    RevisionId: {
      allowNull: false, // TODO
      type: DataTypes.INTEGER
    },
    rating: {
      allowNull: false,
      defaultValue: 0,
      type: DataTypes.STRING,
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