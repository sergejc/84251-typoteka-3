'use strict';

const {Router} = require(`express`);
const {Article, Category, Search} = require(`../services`);
const article = require(`./article`);
const category = require(`./category`);
const search = require(`./search`);
const defineModels = require(`../models`);

const router = new Router();
let sequelize;

function getRouter() {
  defineModels(sequelize);

  article(router, new Article(sequelize));
  category(router, new Category(sequelize));
  search(router, new Search(sequelize));
  return router;
}

function setSequelize(dbConnection) {
  sequelize = dbConnection;
}

module.exports = {
  getRouter,
  setSequelize,
};
