'use strict';

const {Router} = require(`express`);
const myOffers = new Router();
const axios = require(`axios`);
const {API_URL} = require(`../utils/constants`);

myOffers.get(`/category/:id`, (req, res) => res.render(`pages/articles-by-category`));
myOffers.get(`/add`, (req, res) => res.render(`pages/new-post`));
myOffers.get(`/edit/:id`, (req, res) => res.send(`offers/edit/${req.params.id}`));
myOffers.get(`/:id`, async (req, res) => {
  const {data} = await axios.get(`${API_URL}/articles/${req.params.id}`);
  res.send(data);
});

module.exports = myOffers;
