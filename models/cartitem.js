'use strict';
module.exports = (sequelize, DataTypes) => {
  class CartItem extends sequelize.Sequelize.Model{}
  CartItem.init({
    CartId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg:'CartId is required'
        },
      }
    },
    ItemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg:'ItemId is required'
        },
      }
    },
    isPaid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg:'isPaid is required'
        },
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg:'quantity is required'
        },
      }
    }
  }, {
    sequelize
  });
  CartItem.associate = function(models) {
    CartItem.belongsTo(models.Item)
    CartItem.belongsTo(models.Cart)
  };
  return CartItem;
};