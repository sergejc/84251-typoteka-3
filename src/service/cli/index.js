'use strict';

const version = require(`./version`);
const help = require(`./help`);
const generate = require(`./generate`);
const filldb = require(`./filldb`);

const cli = {
  [version.name]: version,
  [help.name]: help,
  [generate.name]: generate,
  [filldb.name]: filldb,
};

module.exports = {
  cli,
};
