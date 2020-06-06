const  {Router} = require('express');
const getMockData = require('../lib/getMockData');
const { Article, Category, Search} = require('../services');
const article = require('./article')
const category = require('./category');
const search = require('./search');

const router = new Router();

(async () => {
  const mockData = await getMockData();

  article(router, new Article(mockData));
  category(router, new Category(mockData));
  search(router, new Search(mockData));
})();

module.exports = router;
