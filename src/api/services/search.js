class Search {
  constructor(offers) {
    this._offers = offers;
  }

  find(term) {
    return this._offers.filter((article) => article.title.includes(term));
  }
}

module.exports = Search;
