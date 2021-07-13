'use strict';

const express = require(`express`);
const {HttpCode} = require(`../constants`);
const {logger} = require(`../service/logger`);
const routes = require(`./api`);

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  logger.debug(`Start request to url ${req.url}`);
  next();
});

app.use(`/api`, routes);

app.use((req, res) => {
  logger.error(`The requested url ${req.url} not found`);
  res.status(HttpCode.NOT_FOUND).send(`Page not found`);
});

module.exports = app;
