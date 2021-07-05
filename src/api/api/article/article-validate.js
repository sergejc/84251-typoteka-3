'use strict';

const {HttpCode} = require(`../../../constants`);
const {logger} = require(`../../logger`);

const articleKeys = [`title`, `ads`, `full_text`];

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const keys = Object.keys(req.body);
  const keysExists = articleKeys.every((key) => keys.includes(key));

  if (!keysExists) {
    logger.info(`The HTTP response status is ${HttpCode.BAD_REQUEST}`);
    return res.status(HttpCode.BAD_REQUEST)
      .send(`Bad request`);
  }

  next();
};
