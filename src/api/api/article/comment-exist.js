'use strict';

const {HttpCode} = require(`../../../constants`);
const {logger} = require(`../../../service/logger`);

module.exports = (service) => async (req, res, next) => {
  const {commentId} = req.params;
  const comment = await service.getCommentById(commentId);

  if (!comment) {
    logger.info(`The HTTP response status is ${HttpCode.NOT_FOUND}`);
    return res.status(HttpCode.NOT_FOUND)
      .send(`Comment with ${commentId} not found`);
  }

  res.locals.comment = comment;
  return next();
};
