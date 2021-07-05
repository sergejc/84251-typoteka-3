'use strict';

const {getRandomIntInclusive, getRandomSubarray, readFileByName } = require(`../generate/utils`);
const sequelize = require(`../../../api/lib/sequelize`);
const defineModels = require(`../../../api/models`);
const Aliase = require(`../../../api/models/aliase`);

const MAX_ANNOUNCE_NUM = 5;

function getType(maxNum, type) {
  const descNum = getRandomIntInclusive(1, maxNum);
  const descObj = new Set();
  Array(descNum).fill().forEach(() => {
    const key = getRandomIntInclusive(0, type.length - 1);
    descObj.add(type[key]);
  });

  return Array.from(descObj);
}

const generateDate = (function () {
  const currDate = new Date();
  const prevDate = new Date();
  prevDate.setMonth(prevDate.getMonth() - 3);
  const diffTime = currDate.getTime() - prevDate.getTime();
  const diffDays = diffTime / (1000 * 3600 * 24);

  return () => {
    const randomDays = getRandomIntInclusive(1, diffDays);
    const cd = new Date();
    cd.setDate(cd.getDate() - randomDays);
    const randomHour = getRandomIntInclusive(0, 23);
    const randomMin = getRandomIntInclusive(0, 59);
    const randomSec = getRandomIntInclusive(0, 59);

    cd.setHours(randomHour);
    cd.setHours(randomMin);
    cd.setHours(randomSec);

    const year = cd.getFullYear();
    const month = String(cd.getMonth() + 1).padStart(2, `0`);
    const day = String(cd.getDay()).padStart(2, `0`);
    const hour = String(cd.getHours()).padStart(2, `0`);
    const min = String(cd.getMinutes()).padStart(2, `0`);
    const sec = String(cd.getSeconds()).padStart(2, `0`);


    return `${year}-${month}-${day} ${hour}:${min}:${sec}`;
  };
}());

const comments = [
  `Это где ж такие красоты?`,
  `Совсем немного...`,
  `Согласен с автором!`,
  `Мне кажется или я уже читал это где-то?`,
  `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.`,
  `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`,
  `Хочу такую же футболку :-)`,
  `Плюсую, но слишком много буквы!`,
  `Планируете записать видосик на эту тему?`
];

const usersData = [
  ['tony.stark@avengers.com', '$2y$10$d8RkJMCh1t0xSGi6B4082ONhgaHouI4mIO2rk/impRcxb0/cjQk0u', 'Tony', 'Stark', 'avatar1.jpg'],
  ['steve.rogers@avengers.com', '$2y$10$RzmYHNRBCCJunRE2E3RC0uui9ROLZ0BhFNpaxYkSQyEPJBUiGzxMq', 'Steve', 'Rogers', 'avatar2.jpg'],
  ['natasha.romanoff@avengers.com', '$2y$10$1UFBmcSgMZ1RwH/vrzL6U.derQ94XejY292bxQCdh.Go49aQtiSaG', 'Natasha', 'Romanoff', 'avatar3.jpg']
];

const MIN_COMMENTS = 1;
const maxComments = comments.length - 1;

function generateComments() {
  const commentsQnt = getRandomIntInclusive(MIN_COMMENTS, maxComments);
  return comments.slice(commentsQnt).map((comment) => ({"id": nanoid(6), "text": comment}));
}

async function seedDB(count) {
  const {User, Article, Category, Comment} = defineModels(sequelize);
  await sequelize.sync({force: true});

  const titles = await readFileByName(`titles.txt`);
  const text = await readFileByName(`sentences.txt`);
  const categories = await readFileByName(`categories.txt`);

  const categoryModels = await Category.bulkCreate(
    categories.map((item) => ({category: item}))
  );

  const userModels = await Promise.all(usersData.map(user => {
    const [email, password_hash, first_name, last_name, avatar] = user;
    return User.create({email, password_hash, first_name, last_name, avatar});
  }));

  const maxFullText = getRandomIntInclusive(1, text.length);
  const articles = Array(count).fill().map(async () => {
    const article = {
      "title": titles[getRandomIntInclusive(0, titles.length - 1)],
      "full_text": getType(maxFullText, text).join(` `).substring(0, 1000),
      "category": getType(categories.length, categories),
      "picture": "picture.jpg",
      "ads": getType(MAX_ANNOUNCE_NUM, text).join(` `).substring(0, 250),
      "user_id": userModels[getRandomIntInclusive(1, 3)],
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
