'use strict';

const {connectDb} = require(`./db`);
const sequelize = require(`./sequelize`);

module.exports = {
  connectDb,
  sequelize,
};
