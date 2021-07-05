'use strict';

const Sequelize = require(`sequelize`);
const Op = Sequelize.Op;

class Search {
  constructor({models}) {
    this._article = models.article;
  }

  find(term) {
    return this._article.findAll({
      where: {
        title: {
          [Op.like]: `%${term}%`
        }
      }
    });
  }
}

module.exports = Search;
