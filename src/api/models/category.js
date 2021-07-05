/* eslint-disable new-cap */
'use strict';

const {Model, DataTypes} = require(`sequelize`);

module.exports = (sequelize) => {
  class Category extends Model {}
  Category.init({
    category: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  }, {
    sequelize,
    timestamps: false,
    modelName: `category`,
  });

  return Category;
};
