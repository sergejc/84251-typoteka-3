'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../../constants`);
const articleValidate = require(`./article-validate`);
const articleExist = require(`./article-exist.js`);
const articleUpdateValidate = require(`./article-update-validate`);
const commentExist = require(`./comment-exist`);
const {logger} = require(`../../logger`);

const router = new Router();

module.exports = (app, service) => {
  app.use(`/articles`, router);

  router.get(`/`, async (req, res) => {
    const articles = await service.findAll();

    logger.info(`The HTTP response status is ${HttpCode.OK}`);
    res.status(HttpCode.OK)
      .json(articles);
  });

  router.get(`/:articleId`, articleExist(service), (req, res) => {
    logger.info(`The HTTP response status is ${HttpCode.OK}`);
    res.status(HttpCode.OK)
      .json(res.locals.article);
  });

  router.post(`/`, articleValidate, async (req, res) => {
    const article = await service.create(req.body);

    logger.info(`The HTTP response status is ${HttpCode.CREATED}`);
    return res.status(HttpCode.CREATED)
      .json(article);
  });

  router.put(`/:articleId`, [articleExist(service), articleUpdateValidate], async (req, res) => {
    const {articleId} = req.params;
    const article = await service.update(
        req.body,
        articleId,
    );

    logger.info(`The HTTP response status is ${HttpCode.UPDATED}`);
    return res.status(HttpCode.UPDATED)
      .json(article);
  });

  router.delete(`/:articleId`, articleExist(service), (req, res) => {
    const {articleId} = req.params;
    service.delete(articleId);

    logger.info(`The HTTP response status is ${HttpCode.NO_CONTENT}`);
    return res.status(HttpCode.NO_CONTENT).send();
  });

  router.get(`/:articleId/comments`, articleExist(service), async (req, res) => {
    const {articleId} = req.params;
    const comments = await service.getComments(articleId);

    logger.info(`The HTTP response status is ${HttpCode.OK}`);
    return res.status(HttpCode.OK).json(comments);
  });

  router.delete(`/:articleId/comments/:commentId`, [articleExist(service), commentExist(service)], async (req, res) => {
    const {commentId} = req.params;
    await service.deleteComment(commentId);

    logger.info(`The HTTP response status is ${HttpCode.NO_CONTENT}`);
    return res.status(HttpCode.NO_CONTENT).send();
  });

  router.post(`/:articleId/comments`, articleExist(service), async (req, res) => {
    const {articleId} = req.params;
    const {user_id: userId} = res.locals.article;
    const comment = await service.createComment(articleId, req.body, userId);

    logger.info(`The HTTP response status is ${HttpCode.CREATED}`);
    return res.status(HttpCode.CREATED)
      .json(comment);
  });
};
