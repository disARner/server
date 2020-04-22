'use strict';
module.exports = (sequelize, DataTypes) => {
  class Category extends sequelize.Sequelize.Model{}
  Category.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg:'name is required'
        },
      }
    }
  }, {
    sequelize
  });
  Category.associate = function(models) {
    Category.hasMany(models.Item)
  };
  return Category;
};