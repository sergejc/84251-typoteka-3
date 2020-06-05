'use strict';

module.exports = {
  DEFAULT_COMMAND: `--help`,
  USER_ARGV_INDEX: 2,
  ExitCode: {success: 0, failure: 1},
  HttpCode: {
    OK: 200,
    CREATED: 201,
    UPDATED: 204,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    NO_CONTENT: 204,
  }
};
