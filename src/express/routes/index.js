'use strict';

const {Router} = require(`express`);
const router = new Router();

const myRoutes = require(`./my`);
const offerRoutes = require(`./offers`);

router.use(`/my`, myRoutes);
router.use(`/offers`, offerRoutes);

router.get(`/register`, (req, res) => res.render(`pages/sign-up`));
router.get(`/login`, (req, res) => res.render(`pages/login`));
router.get(`/search`, (req, res) => res.render(`pages/search`));
router.get(`/`, (req, res) => res.render(`pages/main`));

module.exports = router;
