'use strict';

const {logger} = require(`../../../service/logger`);

async function connectDb(sequelize) {
  try {
    logger.info(`Trying to connect to database...`);
    await sequelize.authenticate();
  } catch (err) {
    logger.error(`An error occured: ${err.message}`);
    process.exit(1);
  }
  logger.info(`Connection to database established`);
}

module.exports = {
  connectDb
};
