'use strict';

const {cli} = require(`./cli`);

const {ExitCode} = require(`../constants`);
const DEFAULT_COMMAND = `--help`;
const USER_ARGV_INDEX = 2;

const userArguments = process.argv.slice(USER_ARGV_INDEX);
const [userCommand] = userArguments;
if (userArguments.length === 0) {
  cli[DEFAULT_COMMAND].run();
  return;
}

if (!cli[userCommand]) {
  process.exit(ExitCode.failure);
}

cli[userCommand].run(userArguments.slice(1));
