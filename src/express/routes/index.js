'use strict';

const {Router} = require(`express`);
const router = new Router();
const axios = require(`axios`);

const myRoutes = require(`./my`);
const offerRoutes = require(`./offers`);
const {API_URL} = require(`../utils/constants`);


router.use(`/my`, myRoutes);
router.use(`/offers`, offerRoutes);

router.get(`/register`, (req, res) => res.render(`pages/sign-up`));

router.get(`/login`, (req, res) => res.render(`pages/login`));

router.get(`/search`, async (req, res) => {
  const search = req.query.search;
  if (!search) {
    return res.render(`pages/search`, {});
  }
  const {data} = await axios.get(`${API_URL}/search`, {params: {query: search}});
  return res.render(`pages/search`, data);
});

router.get(`/`, async (req, res) => {
  const {data} = await axios.get(`${API_URL}/articles`);
  res.render(`pages/main`, {articles: data});
});

router.post(`/articles/add`, async (req, res) => {
  const {title, announce, fullText} = req.body;
  if (title && announce && fullText) {
    await axios.post(`${API_URL}/articles`, req.body);
    res.redirect(303, `http://localhost:8080/my`);
  }
  res.redirect(`http://localhost:8080/offers/add`);
});

module.exports = router;
