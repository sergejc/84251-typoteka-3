'use strict';

const express = require(`express`);
const constants = require(`../constants`);
const { logger } = require(`./logger`);
const routes = require(`./api`);

const app = express();

module.exports = routes().then(apiRoutes => {
  app.use(express.json());
  app.use((req, res, next) => {
    logger.debug(`Start request to url ${req.url}`)
    next();
  });

  app.use('/api', apiRoutes);

  app.use((req, res) => {
    logger.error(`The requested url ${req.url} not found`);
    res.status(404).send(`Page not found`);
  });

  return app;
});

