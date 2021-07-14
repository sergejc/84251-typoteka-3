'use strict';
/* eslint-disable camelcase */

const sequelize = require(`../../../api/lib/sequelize`);
const defineModels = require(`../../../api/models`);
const users = require(`./data/users.json`);
const titles = require(`./data/titles.json`);
const text = require(`./data/text.json`);
const categories = require(`./data/categories.json`);
const comments = require(`./data/comments.json`);
const {getRandomSubArray, getRandomIntInclusive, getRandomIntExclusive} = require(`./utils`);

const MAX_ANNOUNCE_NUM = 5;
const MAX_COMMENTS = 5;
const MAX_ARTICLE_TEXT_LENGTH = 1000;
const MAX_ADS_TEXT_LENGTH = 250;

async function seedDB(count) {
  const {User, Article, Category, Comment} = defineModels(sequelize);
  await sequelize.sync({force: true});

  const categoryModels = await Category.bulkCreate(categories.map(
      (item) => ({category: item})));

  const userModels = await Promise.all(users.map((user) => {
    const [email, password_hash, first_name, last_name, avatar] = user;
    return User.create({email, password_hash, first_name, last_name, avatar});
  }));

  const maxFullText = getRandomIntInclusive(1, text.length);
  const articles = Array(count).fill().map(async () => {
    const article = {
      "title": titles[getRandomIntExclusive(0, titles.length)],
      "full_text": getRandomSubArray(maxFullText, text).join(` `).substring(0, MAX_ARTICLE_TEXT_LENGTH),
      "category": getRandomSubArray(categories.length, categories),
      "picture": `picture.jpg`,
      "ads": getRandomSubArray(MAX_ANNOUNCE_NUM, text).join(` `).substring(0, MAX_ADS_TEXT_LENGTH),
      "user_id": userModels[getRandomIntExclusive(0, users.length)].id,
    };

    const articleModel = await Article.create(article);
    const commentModels = await Promise.all(getRandomSubArray(MAX_COMMENTS, comments).map(async (commentText) => {
      const commentModel = await Comment.create({full_text: commentText});
      await commentModel.setUser(userModels[getRandomIntExclusive(0, users.length)]);
      return commentModel;
    }));

    await articleModel.addComments(commentModels);
    await articleModel.addCategories(getRandomSubArray(categoryModels.length, categoryModels));
    return articleModel;
  });
  await Promise.all(articles);
}

module.exports = {
  seedDB,
};
