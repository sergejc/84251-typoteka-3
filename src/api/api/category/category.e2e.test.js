'use strict';

const request = require(`supertest`);
const app = require('../../app');

describe(`Search API end-point`, () => {
  test(`that Category API works as expected`, async () => {
    const expectedResult = [
      'IT',
      'Разное',
      'Музыка',
      'Аудио и видео',
      'За жизнь',
      'Коллекционирование',
      'Наушники',
      'Железо',
      'Монеты',
      'Кино',
      'Хобби и отдых',
      'Без рамки',
      'Программирование'
    ];

    const res = await request(await app()).get(`/api/categories`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(expectedResult);
  });
});
