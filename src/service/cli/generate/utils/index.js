'use strict';

const fs = require(`fs`).promises;

const {ExitCode} = require('../../../../constants');
const PATH_TO_DATA_FOLDER = `${__dirname}/../data/`;

function getRandomIntInclusive(min, max) {
  return Math.ceil(Math.random() * (max - min)) + min;
}

async function readFileByName(fileName) {
  let data;
  try {
    data = await fs.readFile(`${PATH_TO_DATA_FOLDER}${fileName}`, `utf8`);
  } catch (err) {
    process.exit(ExitCode.FAILURE);
  }

  return data.trim().split(`\n`);
}

module.exports = {
  getRandomIntInclusive,
  readFileByName,
};
