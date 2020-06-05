'use strict';
const {nanoid} = require(`nanoid`);
const {getRandomIntInclusive, readFileByName} = require(`../../../utils`);

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
  "Это где ж такие красоты?",
  "Совсем немного...",
  "Согласен с автором!",
  "Мне кажется или я уже читал это где-то?",
  "Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.",
  "Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.",
  "Хочу такую же футболку :-)",
  "Плюсую, но слишком много буквы!",
  "Планируете записать видосик на эту тему?"
];

const MIN_COMMENTS = 1;
const MAX_COMMENTS = comments.length - 1;

function generateComments() {
  const commentsQnt = getRandomIntInclusive(MIN_COMMENTS, MAX_COMMENTS);
  return comments.slice(commentsQnt).map((comment) => ({"id": nanoid(6), "text": comment}));
}

async function generateOffers(count) {
  const titles = await readFileByName(`titles.txt`);
  const text = await readFileByName(`sentences.txt`);
  const categories = await readFileByName(`categories.txt`);

  const maxFullText = getRandomIntInclusive(1, text.length);
  return Array(count).fill().map(() => {
    return ({
      "id": nanoid(6),
      "title": titles[getRandomIntInclusive(0, titles.length - 1)],
      "announce": getType(MAX_ANNOUNCE_NUM, text).join(` `),
      "fullText": getType(maxFullText, text).join(` `),
      "category": getType(categories.length, categories),
      "createdDate": generateDate(),
      "comments": generateComments(),
    });
  });
}

module.exports = {
  generateOffers,
};
