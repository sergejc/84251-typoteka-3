const {HttpCode} = require('../../../constants');
const {logger} = require(`../../logger`);

module.exports = (service) => (req, res, next) => {
  const {articleId, commentId} = req.params;
  const comment = service.getCommentById(articleId, commentId);

  if (!comment) {
    logger.info(`The HTTP response status is ${HttpCode.NOT_FOUND}`);
    return res.status(HttpCode.NOT_FOUND)
      .send(`Comment with ${commentId} not found`);
  }

  res.locals.comment = comment;
  return next();
};
