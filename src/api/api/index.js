'use strict';

const {Router} = require(`express`);
const {Article, Category, Search} = require(`../services`);
const article = require(`./article`);
const category = require(`./category`);
const search = require(`./search`);
const sequelize = require(`../lib/db/sequelize`);
const defineModels = require(`../models`);

const router = new Router();

defineModels(sequelize);

article(router, new Article(sequelize));
category(router, new Category(sequelize));
search(router, new Search(sequelize));

module.exports = router;
