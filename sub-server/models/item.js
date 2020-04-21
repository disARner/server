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
        isNumber: (value, next) => {
          if(value < 0) {
            next({
              status: 400,
              message: 'price cant a negative number'
            })
          }
          else next()
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
        min: {
        args:  [0],
        msg: 'Stock cannot be negative'
        }
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'imageUrl is required'
        }
      },
      defaultValue: 'https://www.dubaiautodrome.com/wp-content/uploads/2016/08/placeholder.png'
    },
    model3d: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    }
  }, {
    sequelize
  });
  Item.associate = function(models) {
    Item.hasMany(models.CartItem)
  };
  return Item;
};