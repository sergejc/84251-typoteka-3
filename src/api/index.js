'use strict';

const app = require(`./app`);
const {logger} = require(`../service/logger`);
const constants = require(`../constants`);
const {connectDb} = require(`../api/services/db`);

const DEFAULT_PORT = 3000;
const port = Number.parseInt(process.argv[2], 10) || DEFAULT_PORT;

(async () => {
  try {
    await connectDb();
    app.listen(port, () => {
      logger.info(`Server start on port: ${port}`);
    });
  } catch (err) {
    logger.error(`Server can't start on port: ${port}, Error: ${err}`);
    process.exit(constants.ExitCode.failure);
  }
})();
