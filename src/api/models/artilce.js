/* eslint-disable new-cap,camelcase */
'use strict';

const {Model, DataTypes} = require(`sequelize`);

module.exports = (sequelize) => {
  class Article extends Model {}
  Article.init({
    title: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    full_text: {
      type: DataTypes.STRING(1000),
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    picture: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    ads: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
  }, {
    sequelize,
    timestamps: false,
    indexes: [{fields: [`title`]}],
    modelName: `article`,
  });

  return Article;
};
