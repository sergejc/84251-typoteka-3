'use strict';

const chalk = require(`chalk`);
const express = require(`express`);
const routes = require(`./api`);
const constants = require('../../../constants');

const app = express();
app.use(express.json());
app.use('/api', routes);

const DEFAULT_PORT = 3000;

module.exports = {
  name: `--server`,
  run([arg]) {
    const port = Number.parseInt(arg, 10) || DEFAULT_PORT;
    try {
      app.listen(port, () => console.log(chalk.blue(`Сервер запущен на порту: ${port}`)));
    } catch (err) {
      console.log(chalk.red(`Could not open port ${port}`));
      process.exit(constants.ExitCode.failure);
    }
  }
};
