/* eslint-disable no-undef */
'use strict';

const request = require(`supertest`);
const app = require(`../../app`);
const getMockData = require(`../../lib/getMockData`);
const Category = require(`../../services/category`);

let expectedResult;
beforeAll(async () => {
  const mockData = await getMockData();
  const category = new Category(mockData);
  expectedResult = category.findAll();
});

describe(`Search API end-point`, () => {
  test(`that Category API works as expected`, async () => {
    const res = await request(await app()).get(`/api/categories`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(expectedResult);
  });
});
