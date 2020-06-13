const {HttpCode} = require('../../../constants');

const articleKeys = ["title", "announce", "fullText", "category", "createdDate", "comments"]

module.exports = (req, res, next) => {
  const newOffer = req.body;
  const keys = Object.keys(newOffer);
  const keysExists = keys.every((key) => articleKeys.includes(key));

  if (!keysExists) {
    return res.status(HttpCode.BAD_REQUEST)
      .send(`Bad request`);
  }

  next();
};
