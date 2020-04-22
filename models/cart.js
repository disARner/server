'use strict';
module.exports = (sequelize, DataTypes) => {
  class Cart extends sequelize.Sequelize.Model{}
  Cart.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg:'UserId is required'
        },
      }
    }
  }, {
    sequelize
  });
  Cart.associate = function(models) {
    Cart.belongsTo(models.User)
    Cart.hasMany(models.CartItem)
  };
  return Cart;
};