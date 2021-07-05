'use strict';

class Category {
  constructor({models}) {
    this._category = models.category;
  }

  findAll() {
    return this._category.findAll();
  }
}

module.exports = Category;
