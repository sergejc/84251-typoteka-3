'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const {generateOffers} = require(`./generateOffers`);
const {ExitCode} = require(`../../../constants`);

const FILE_NAME = __dirname + `/mock.json`;
const DEFAULT_COUNT = 1;
const MAX_COUNT = 1000;

module.exports = {
  name: `--generate`,
  run([arg]) {
    let count = Number.parseInt(arg, 10) || DEFAULT_COUNT;

    if (count > MAX_COUNT) {
      console.info(chalk.red(`Не больше 1000 объявлений`));
      process.exit(ExitCode.FAILURE);
    }

    async function writeMock() {
      try {
        await fs.writeFile(FILE_NAME, JSON.stringify(await generateOffers(count)));
        console.log(chalk.green(`Operation success. File created.`));
        process.exit(ExitCode.SUCCESS);
      } catch (err) {
        console.log(err);
        console.error(chalk.red(`Can't write data to file...`));
        process.exit(ExitCode.FAILURE);
      }
    }

    writeMock();
  }
};
