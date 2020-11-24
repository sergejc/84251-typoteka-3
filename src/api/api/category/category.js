'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../../constants`);
const {logger} = require(`../../logger`);

const router = new Router();

module.exports = (app, service) => {
  app.use(`/categories`, router);

  router.get(`/`, (req, res) => {
    const categories = service.findAll();
    logger.info(`The HTTP response status is ${HttpCode.OK}`);
    res.status(HttpCode.OK)
      .json(categories);
  });
};
