'use strict';

const {Router} = require(`express`);
const axios = require(`axios`);
const myRouter = new Router();

myRouter.get(`/`, async (req, res) => {
  const {data} = await axios.get('http://localhost:3000/api/articles');
  res.render(`pages/my`, {articles: data});
});

myRouter.get(`/comments`, async (req, res) => {
  const {data: [article]} = await axios.get(`http://localhost:3000/api/articles`);
  const {data} = await axios.get(`http://localhost:3000/api/articles/${article.id}/comments`);
  res.render(`pages/comments`, {comments: data});
});

module.exports = myRouter;
