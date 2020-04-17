'use strict';
module.exports = (sequelize, DataTypes) => {
  class Item extends sequelize.Sequelize.Model{}
  Item.init({
    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg:'CategoryId is required'
        },
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg:'name is required'
        },
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notNull: {
          args: true,
          msg:'price is required'
        },
        isNumber: (value,next) => {
          if(value < 1) {
            next({
              status: 400,
              message: 'price cant a negative number'
            })
          }
          if(typeof value !== 'number') {
            next({
              status: 400,
              message: 'price must be a number'
            })
          }
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg:'stock is required'
        },
      }
    }
  }, {
    sequelize
  });
  Item.associate = function(models) {
    Item.hasMany(models.CartItem)
  };
  return Item;
};