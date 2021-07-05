'use strict';

const fs = require(`fs`).promises;

const {ExitCode} = require(`../../../../constants`);
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

const getRandomSubarray = (items) => {
  items = items.slice();
  let count = getRandomIntInclusive(1, items.length - 1);
  const result = [];
  while (count--) {
    result.push(
        ...items.splice(
            getRandomInt(0, items.length - 1), 1
        )
    );
  }
  return result;
};

module.exports = {
  getRandomIntInclusive,
  readFileByName,
  getRandomSubarray,
};
