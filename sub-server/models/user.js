'use strict';

const {encrypt} = require('../helpers')

module.exports = (sequelize, DataTypes) => {
  class User extends sequelize.Sequelize.Model{}
  User.init({
    username: {
      isUnique: {
        msg: 'Username already used'
      },
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg:'username is required'
        }
      }
    },
    email: {
      isUnique: {
        msg: 'Email is already used'
      },
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg:'email is required'
        },
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg:'password is required'
        },
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg:'role is required'
        },
        isIn: {
          args: [['admin', 'user']],
          msg: 'only admin or user role is allowed'
        }
      }
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate(user, options) {
        encrypt(user)
      }
    }
  });
  User.associate = function(models) {
    User.hasOne(models.Cart)
  };
  return User;
};