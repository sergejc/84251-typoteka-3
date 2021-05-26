/* eslint-disable no-undef */
'use strict';

const request = require(`supertest`);
const getApp = require(`../../app`);
const Search = require(`../../services/search`);
const getMockData = require(`../../lib/getMockData`);

let searchTerm;
let articles;
beforeAll(async () => {
  const mockData = await getMockData();
  const expectedArticle = mockData[0];
  searchTerm = expectedArticle.title.split(` `).pop();
  articles = (new Search(mockData)).find(searchTerm);
});

let app;
beforeEach(async () => {
  app = await getApp();
});

describe(`Search API end-point`, () => {
  test(`that search returns the valid result`, async () => {
    const res = await request(app).get(`/api/search`).query({query: searchTerm});
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toEqual(articles.length);
  });

  test(`that search returns an empty array when no search result found`, async () => {
    const res = await request(app).get(`/api/search`).query({query: `foobar`});
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toEqual(0);
  });
});
