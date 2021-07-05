'use strict';

const {HttpCode} = require(`../../../constants`);
const {logger} = require(`../../logger`);

module.exports = (service) => async (req, res, next) => {
  const {articleId} = req.params;
  const article = await service.findById(articleId);

  if (!article) {
    logger.info(`The HTTP response status is ${HttpCode.NOT_FOUND}`);
    return res.status(HttpCode.NOT_FOUND)
      .send(`Article with ${articleId} not found`);
  }

  res.locals.article = article;
  return next();
};
