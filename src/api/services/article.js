const {nanoid} = require(`nanoid`);

const MAX_ID_LENGTH = 6;

class Article {
  constructor(articles) {
    this._articles = articles.reduce((acc, curr) =>{
      acc[curr.id] = curr;
      return acc;
    }, {});
  }

  findAll() {
    return Object.values(this._articles);
  }

  findById(id) {
    return this._articles[id];
  }

  create(article) {
    const id = nanoid(MAX_ID_LENGTH);
    this._articles[id] = {
      category: [],
      comments: [],
      ...article,
      id,
    };

    return this._articles[id];
  }

  update(newArticle, id) {
    this._articles[id] = {
      ...this._articles[id],
      ...newArticle,
    };

    return this._articles[id];
  }

  delete(id) {
    delete this._articles[id];
  }

  getComments(articleId) {
    return this._articles[articleId].comments;
  }

  getCommentById(articleId, commentId) {
    return this.getComments(articleId).find((comment) => comment.id === commentId);
  }

  deleteComment(articleId, commendId) {
    const article = this._articles[articleId];
    const comments = article.comments.filter((comment) => comment.id !== commendId);
    this._articles[articleId] = {
      ...this._articles[articleId],
      comments,
    };
  }

  createComment(articleId, commentData) {
    const newComment = {
      id: nanoid(MAX_ID_LENGTH),
      ...commentData
    };
    this._articles[articleId].comments.push(newComment);

    return newComment;
  }
}

module.exports = Article;
