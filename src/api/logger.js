'use strict';

const pino = require(`pino`);

const logger = pino({
  name: `pino-and-express`,
  level: process.env.LOG_LEVEL || `info`
}, pino.destination(`./src/service/logs/output.log`));

module.exports = {
  logger,
  getLogger(options = {}) {
    return logger.child(options);
  }
};
