'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const {ExitCode} = require(`../../../constants`);

const FILE_NAME = __dirname + `/help.txt`;

module.exports = {
  name: `--help`,
  run() {
    (async () => {
      try {
        const data = await fs.readFile(FILE_NAME, `utf8`);
        console.info(chalk.gray(data));
        process.exit(ExitCode.SUCCESS);
      } catch (err) {
        process.exit(ExitCode.FAILURE);
      }
    })();
  }
};
