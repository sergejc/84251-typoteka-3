const {Router} = require(`express`);
const {HttpCode} = require('../../../constants');

const router = new Router();

module.exports = (app, service) => {
  app.use(`/search`, router);

  router.get(`/`, (req, res) => {
    const articles = service.find(req.query.query);
    res.status(HttpCode.OK).json(articles);
  });
};
