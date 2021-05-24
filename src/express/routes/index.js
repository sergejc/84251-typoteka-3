'use strict';

const {Router} = require(`express`);
const router = new Router();
const axios = require(`axios`);

const myRoutes = require(`./my`);
const offerRoutes = require(`./offers`);

router.use(`/my`, myRoutes);
router.use(`/offers`, offerRoutes);

router.get(`/register`, (req, res) => res.render(`pages/sign-up`));
router.get(`/login`, (req, res) => res.render(`pages/login`));
router.get(`/search`, async (req, res) => {
    const search = req.query.search;
    let data = {};
    if(search) {
        const response = await axios.get(`http://localhost:3000/api/search`, { params: { query: search } });
        data = response.data;
    }
    res.render(`pages/search`, data);
});
router.get(`/`, async (req, res) => {
    const {data} = await axios.get(`http://localhost:3000/api/articles`);
    res.render(`pages/main`, {articles: data});
});
router.post(`/articles/add`, async (req, res) => {
    const {title, announce, fullText} = req.body;
    if(title, announce, fullText) {
        await axios.post(`http://localhost:3000/api/articles`, req.body);
        res.redirect(303, 'http://localhost:8080/my')    
    }
    
    res.redirect('http://localhost:8080/offers/add');
});

module.exports = router;
