'use strict';

const defineArticle = require(`./artilce`);
const defineCategory = require(`./category`);
const defineUser = require(`./user`);
const defineComment = require(`./comment`);
const {Model} = require(`sequelize`);
const Aliase = require(`./aliase`);

const define = (sequelize) => {
  const User = defineUser(sequelize);
  const Article = defineArticle(sequelize);
  const Category = defineCategory(sequelize);
  const Comment = defineComment(sequelize);
  class ArticleCategory extends Model {}
  ArticleCategory.init({}, {sequelize, modelName: `articles_categories`, timestamps: false});

  Article.belongsTo(User, {foreignKey: `user_id`, as: Aliase.USERS});
  Article.hasMany(Comment, {foreignKey: `article_id`, as: Aliase.COMMENTS});
  User.hasMany(Article, {foreignKey: `user_id`, as: Aliase.Article});

  Comment.belongsTo(User, {foreignKey: `user_id`});
  Comment.belongsTo(Article, {foreignKey: `article_id`});

  Category.belongsToMany(Article, {through: ArticleCategory, as: Aliase.ARTICLES, foreignKey: `category_id`});
  Article.belongsToMany(Category, {through: ArticleCategory, as: Aliase.CATEGORIES, foreignKey: `article_id`});

  return {Article, User, Category, Comment};
};

module.exports = define;
