'use strict';

const sequelize = require(`../../../api/lib/sequelize`);
const defineModels = require(`../../../api/models`);
const Aliase = require(`../../../api/models/aliase`);
const users = require(`./data/users.json`);
const titles = require(`./data/titles.json`);
const text = require(`./data/text.json`);
const categories = require(`./data/categories.json`);
const {getRandomSubArray, getRandomIntInclusive} = require(`./utils`)

const MAX_ANNOUNCE_NUM = 5;

async function seedDB(count) {
  const {User, Article, Category} = defineModels(sequelize);
  await sequelize.sync({force: true});

  const categoryModels = await Category.bulkCreate(
    categories.map((item) => ({category: item}))
  );

  const userModels = await Promise.all(users.map(user => {
    const [email, password_hash, first_name, last_name, avatar] = user;
    return User.create({email, password_hash, first_name, last_name, avatar});
  }));

  const maxFullText = getRandomIntInclusive(1, text.length);
  const articles = Array(count).fill().map(async () => {
    const article = {
      "title": titles[getRandomIntInclusive(0, titles.length - 1)],
      "full_text": getRandomSubArray(maxFullText, text).join(` `).substring(0, 1000),
      "category": getRandomSubArray(categories.length, categories),
      "picture": "picture.jpg",
      "ads": getRandomSubArray(MAX_ANNOUNCE_NUM, text).join(` `).substring(0, 250),
      "user_id": userModels[getRandomIntInclusive(1, users.length)],
    };
    
    const articleModel = await Article.create(article, {include: [Aliase.COMMENTS]});
    await articleModel.addCategories(categoryModels);
    return articleModel;
  });
  await Promise.all(articles);
}

module.exports = {
  seedDB,
};
