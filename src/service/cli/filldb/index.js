'use strict';

const sequelize = require(`../../../api/lib/sequelize`);
const {ExitCode} = require(`../../../constants`);
const {logger} = require(`../../../service/logger`);
const {seedDB} = require(`./seedDB`);

const DEFAULT_COUNT = 1;
const MAX_COUNT = 1000;

module.exports = {
  name: `--filldb`,
  run([arg]) {
    const count = Number.parseInt(arg, 10) || DEFAULT_COUNT;

    if (count > MAX_COUNT) {
      logger.info(`No more than 1000 articles`);
      process.exit(ExitCode.FAILURE);
    }

    async function fillDb() {
      try {
        logger.info(`Trying to connect to database...`);
        await sequelize.authenticate();
        await seedDB(count);
        process.exit(ExitCode.SUCCESS);
      } catch (err) {
        logger.error(`An error occured: ${err.message}`);
        process.exit(ExitCode.FAILURE);
      }
      logger.error(`Connection to database established`);
    }

    fillDb();
  }
};
