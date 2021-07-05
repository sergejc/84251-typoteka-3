/* eslint-disable camelcase */
'use strict';

const {Model, DataTypes, Sequelize} = require(`sequelize`);

module.exports = (sequelize) => {
  class Comment extends Model {}
  Comment.init({
    full_text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW
    },
  }, {
    sequelize,
    timestamps: false,
    modelName: `comment`,
  });

  return Comment;
};
