'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../../constants`);
const {logger} = require(`../../../service/logger`);

const router = new Router();

module.exports = (app, service) => {
  app.use(`/categories`, router);

  router.get(`/`, async (req, res) => {
    const categories = await service.findAll();
    logger.info(`The HTTP response status is ${HttpCode.OK}`);
    res.status(HttpCode.OK)
      .json(categories);
  });
};
