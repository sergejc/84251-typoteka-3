'use strict';

const {getRandomIntInclusive} = require(`../../../utils`);

const Titles = [
  `Ёлки. История деревьев`,
  `Как перестать беспокоиться и начать жить`,
  `Как достигнуть успеха не вставая с кресла`,
  `Обзор новейшего смартфона`,
  `Лучше рок-музыканты 20-века`,
  `Как начать программировать`,
  `Учим HTML и CSS`,
  `Что такое золотое сечение`,
  `Как собрать камни бесконечности`,
  `Борьба с прокрастинацией`,
  `Рок — это протест`,
  `Самый лучший музыкальный альбом этого года`,
];
const Text = [
  `Ёлки — это не просто красивое дерево. Это прочная древесина.`,
  `Первая большая ёлка была установлена только в 1938 году.`,
  `Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
  `Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.`,
  `Золотое сечение — соотношение двух величин, гармоническая пропорция.`,
  `Собрать камни бесконечности легко, если вы прирожденный герой.`,
  `Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.`,
  `Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.`,
  `Программировать не настолько сложно, как об этом говорят.`,
  `Простые ежедневные упражнения помогут достичь успеха.`,
  `Это один из лучших рок-музыкантов.`,
  `Он написал больше 30 хитов.`,
  `Из под его пера вышло 8 платиновых альбомов.`,
  `Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
  `Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?`,
  `Достичь успеха помогут ежедневные повторения.`,
  `Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.`,
  `Как начать действовать? Для начала просто соберитесь.`,
  `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры.`,
  `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.`,
];
const MAX_ANNOUNCE_NUM = 5;
const Categories = [
  `Деревья`,
  `За жизнь`,
  `Без рамки`,
  `Разное`,
  `IT`,
  `Музыка`,
  `Кино`,
  `Программирование`,
  `Железо`,
];

function getType(maxNum, type) {
  const descNum = getRandomIntInclusive(1, maxNum);
  const descObj = Array(descNum).fill().reduce((acc) => {
    const key = getRandomIntInclusive(0, type.length - 1);
    acc[type[key]] = true;
    return acc;
  }, {});

  return Object.keys(descObj);
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

function generateOffers(count) {
  const maxFullText = getRandomIntInclusive(1, Text.length);
  return Array(count).fill().map(() => {
    return ({
      "title": Titles[getRandomIntInclusive(0, Titles.length - 1)],
      "announce": getType(MAX_ANNOUNCE_NUM, Text).join(` `),
      "fullText": getType(maxFullText, Text).join(` `),
      "category": getType(Categories.length, Categories),
      "createdDate": generateDate(),
    });
  });
}

module.exports = {
  generateOffers,
};
