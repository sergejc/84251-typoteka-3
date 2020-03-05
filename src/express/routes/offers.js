'use strict';

const {Router} = require(`express`);
const myOffers = new Router();

myOffers.get(`/category/:id`, (req, res) => res.render(`pages/articles-by-category`));
myOffers.get(`/add`, (req, res) => res.render(`pages/new-post`));
myOffers.get(`/edit/:id`, (req, res) => res.send(`offers/edit/${req.params.id}`));
myOffers.get(`/:id`, (req, res) => res.send(`offers/${req.params.id}`));

module.exports = myOffers;
