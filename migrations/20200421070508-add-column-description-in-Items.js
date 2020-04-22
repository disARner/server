'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.addColumn('Items', 'description', Sequelize.STRING, { after: "model3d" })
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.removeColumn('Items', 'description', {})
  }
};
