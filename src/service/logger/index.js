'use strict';

const pino = require(`pino`);

const logger = pino({
  name: `app-logger`,
  level: process.env.LOG_LEVEL || `info`
}, pino.destination(__dirname + `/output.log`));

module.exports = {
  logger,
  getLogger(options = {}) {
    return logger.child(options);
  }
};
