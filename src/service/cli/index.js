'use strict';

const version = require(`./version`);
const help = require(`./help`);
const filldb = require(`./filldb`);

const cli = {
  [version.name]: version,
  [help.name]: help,
  [filldb.name]: filldb,
};

module.exports = {
  cli,
};
