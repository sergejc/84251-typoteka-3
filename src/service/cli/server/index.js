'use strict';

const {startServer} = require(`./server`);
const DEFAULT_PORT = 3000;

module.exports = {
  name: `--server`,
  run([arg]) {
    const port = Number.parseInt(arg, 10) || DEFAULT_PORT;
    startServer(port);
  }
};
