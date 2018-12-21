var utils=require('../lib/utils');
const bcrypt = require("bcrypt");

module.exports = {
  up: (queryInterface, Sequelize) => {
      var password = utils.stringGen(10);
      console.log("Admin password:", password);
      return queryInterface.bulkInsert('users', [
          {
              login: 'admin',
              password: bcrypt.hashSync(password,
                                        bcrypt.genSaltSync(8)),
              created_at: new Date,
              updated_at: new Date,
          },
          {
              login: 'guest',
              password: bcrypt.hashSync(utils.stringGen(10),
                                        bcrypt.genSaltSync(8)),
              created_at: new Date,
              updated_at: new Date,
          },

      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('users', null, {});
  }
};
