'use strict';

const path = require(`path`);

module.exports = {
  ExitCode: {
    SUCCESS: 0,
    FAILURE: 1,
  },
  HttpCode: {
    OK: 200,
    CREATED: 201,
    UPDATED: 204,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    NO_CONTENT: 204,
  },
  PROJECT_SRC: path.resolve(__dirname),
};
