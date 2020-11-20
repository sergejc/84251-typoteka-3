'use strict';

const request = require(`supertest`);
const getApp = require(`../../app`);

let app;
beforeEach(async () => {
  app = await getApp();
});

describe(`Article API endpoint`, () => {
  describe(`get /`, () => {
    test(`that Articles API returns the expected result`, async () => {
      const res = await request(app).get(`/api/articles`);
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toEqual(5);
    });
  });

  describe(`get /:articleId`, () => {
    test(`that Articles API by Id returns an existing article`, async () => {
      const res = await request(app).get(`/api/articles/QQafsx`);
      expect(res.statusCode).toBe(200);
      expect(res.body.title).toEqual(`Борьба с прокрастинацией`);
    });

    test(`that Articles API returns 404 when articles was not found`, async () => {
      const res = await request(app).get(`/api/articles/foo`);
      expect(res.statusCode).toBe(404);
      expect(res.text).toBe(`Article with foo not found`);
    });
  });

  describe(`post /`, () => {
    test(`a new article can be created`, async () => {
      const res = await request(app).post(`/api/articles`).send({
        title: `title`,
        announce: `announce`,
        fullText: `full text`,
        category: [],
        createdDate: ``,
        comments: ``
      });
      expect(res.statusCode).toBe(201);
    });

    test(`that Articles API returns 400 when the title property does not exisist`, async () => {
      const res = await request(app).post(`/api/articles`).send({
        announce: `announce`,
        fullText: `full text`,
        category: [],
        createdDate: ``,
        comments: ``
      });
      expect(res.statusCode).toBe(400);
    });
  });

  describe(`put /:articleId`, () => {
    test(`that an article can be update`, async () => {
      const res = await request(app).put(`/api/articles/QQafsx`).send({
        title: `new title`,
        announce: `announce`,
        fullText: `full text`,
        category: [],
        createdDate: ``,
        comments: ``
      });

      expect(res.statusCode).toBe(204);
    });

    test(`that 404 returns trying to update an article which does not exist`, async () => {
      const res = await request(app).put(`/api/articles/foo`).send({});
      expect(res.statusCode).toBe(404);
    });

    test(`that 400 returns trying to update an article using malformed data`, async () => {
      const res = await request(app).put(`/api/articles/QQafsx`).send({});
      expect(res.statusCode).toBe(400);
    });
  });

  describe(`delete /:articleId`, () => {
    test(`that an article can be deleted using Article API`, async () => {
      const res = await request(app).delete(`/api/articles/QQafsx`).send({});
      expect(res.statusCode).toBe(204);
    });

    test(`that 404 returns trying to delete an article which does not exist`, async () => {
      const res = await request(app).delete(`/api/articles/foo`);
      expect(res.statusCode).toBe(404);
    });
  });

  describe(`get /:articleId/comments`, () => {
    test(`that Article API returns comments for choised article`, async () => {
      const res = await request(app).get(`/api/articles/sBJBdg/comments`);
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toEqual(5);
    });

    test(`that Article API returns 404 trying to query an artilce which does not exist`, async () => {
      const res = await request(app).get(`/api/articles/foo/comments`);
      expect(res.statusCode).toBe(404);
    });
  });

  describe(`delete /:articleId/comments/:commentId`, () => {
    test(`that comments can be deleted`, async () => {
      const res = await request(app).delete(`/api/articles/sBJBdg/comments/Q4NylP`);
      expect(res.statusCode).toBe(204);
    });

    test(`that 404 returns when the article does not exist`, async () => {
      const res = await request(app).delete(`/api/articles/foo/comments/Q4NylP`);
      expect(res.statusCode).toBe(404);
    });

    test(`that 404 returns when the comment does not exist`, async () => {
      const res = await request(app).delete(`/api/articles/sBJBdg/comments/foo`);
      expect(res.statusCode).toBe(404);
    });
  });

  describe(`post /:articleId/comments`, () => {
    test(`a new comment can be created`, async () => {
      const res = await request(app).post(`/api/articles/vjMZvz/comments`).send({
        text: `long text`,
      });

      expect(res.statusCode).toBe(201);
    });

    test(`that Articles API returns 404 when the article does not exsist`, async () => {
      const res = await request(app).post(`/api/articles/foo/comments`).send({
        text: `long text`,
      });

      expect(res.statusCode).toBe(404);
    });
  });
});
