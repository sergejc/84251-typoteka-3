const {Router} = require(`express`);
const {HttpCode} = require('../../../constants');
const articleValidate = require('./articleValidate');
const articleExist = require('./articleExist.js');
const articleUpdateValidate = require('./articleUpdateValidate');
const commentExist =  require('./commentExist');

const router = new Router();

module.exports = (app, service) => {
  app.use(`/articles`, router);

  router.get(`/`, (req, res) => {
    const articles = service.findAll();

    res.status(HttpCode.OK)
      .json(articles);
  });

  router.get(`/:articleId`, articleExist(service), (req, res) => {
    res.status(HttpCode.OK)
      .json(res.locals.article);
  });

  router.post(`/`, articleValidate, (req, res) => {
    const article = service.create(req.body);

    return res.status(HttpCode.CREATED)
      .json(article);
  });

  router.put(`/:articleId`, [articleExist(service), articleUpdateValidate], (req, res) => {
    const {articleId} = req.params;
    const article = service.update(
      req.body,
      articleId,
    );

    return res.status(HttpCode.UPDATED)
      .json(article);
  });

  router.delete(`/:articleId`, articleExist(service), (req, res) => {
    const {articleId} = req.params;
    service.delete(articleId);

    return res.status(HttpCode.NO_CONTENT).send();
  });

  router.get(`/:articleId/comments`, articleExist(service), (req, res) => {
    const {articleId} = req.params;
    const comments = service.getComments(articleId);

    return res.status(HttpCode.OK).json(comments);
  });

  router.delete(`/:articleId/comments/:commentId`, [articleExist(service), commentExist(service)], (req, res) => {
    const {articleId, commentId} = req.params;
    service.deleteComment(articleId, commentId);

    return res.status(HttpCode.NO_CONTENT).send();
  });

  router.post(`/:articleId/comments`, articleExist(service), (req, res) => {
    const {articleId} = req.params;
    const comment = service.createComment(articleId, req.body);

    return res.status(HttpCode.CREATED)
      .json(comment);
  });
};
