'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('CartItems', ['ItemId'], {
      type: 'foreign key',
      name: 'ItemId',
      references: {
        table: 'Items',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('CartItems', 'ItemId', {})
  }
};
