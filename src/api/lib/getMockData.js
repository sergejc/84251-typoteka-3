const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const logger = require('../logger');
const MOCK_FILE = __dirname +`/../../service/cli/generate/mock.json`;
let data = null;

const getMockData = async () => {
  if (data !== null) {
    return Promise.resolve(data);
  }

  try {
    const fileContent = await fs.readFile(MOCK_FILE);
    data = JSON.parse(fileContent);
  } catch (err) {
    logger.error(err);
    return Promise.reject(err);
  }

  return Promise.resolve(data);
};

module.exports = getMockData;
