'use strict';

const {Router} = require(`express`);
const axios = require(`axios`);
const {API_URL} = require(`../utils/constants`);

const myRouter = new Router();

myRouter.get(`/`, async (req, res) => {
  const {data} = await axios.get(`${API_URL}/articles`);
  res.render(`pages/my`, {articles: data});
});

myRouter.get(`/comments`, async (req, res) => {
  const {data: [article]} = await axios.get(`${API_URL}/api/articles`);
  const {data} = await axios.get(`${API_URL}/api/articles/${article.id}/comments`);
  res.render(`pages/comments`, {comments: data});
});

module.exports = myRouter;
