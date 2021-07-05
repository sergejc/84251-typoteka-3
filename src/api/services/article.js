/* eslint-disable camelcase */
'use strict';

const Aliase = require(`../models/aliase`);

class Article {
  constructor({models}) {
    this._article = models.article;
    this._comment = models.comment;
  }

  findAll() {
    return this._article.findAll({include: Aliase.COMMENTS});
  }

  findById(id) {
    return this._article.findByPk(id, {include: Aliase.COMMENTS});
  }

  create(article) {
    return this._article.create({
      ...article,
    });
  }

  update(newArticle, id) {
    return this._article.update(newArticle, {where: {id}});
  }

  delete(id) {
    const res = this._article.destroy({
      where: {
        id
      }
    });
    return !!res;
  }

  async getComments(articleId) {
    return (await this.findById(articleId)).comments;
  }

  getCommentById(id) {
    return this._comment.findByPk(id);
  }

  deleteComment(id) {
    return this._comment.destroy({where: {id}});
  }

  createComment(articleId, commentData, userId) {
    return this._comment.create({...commentData, user_id: userId, article_id: articleId});
  }
}

module.exports = Article;
