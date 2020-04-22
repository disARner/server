'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Items', ['CategoryId'], {
      type: 'foreign key',
      name: 'CategoryId',
      references: {
        table: 'Categories',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Items', 'CategoryId', {})
  }
};
