/* eslint-disable new-cap,camelcase */
'use strict';

const {Model, DataTypes} = require(`sequelize`);

module.exports = (sequelize) => {
  class User extends Model {}
  User.init({
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
  }, {
    sequelize,
    timestamps: false,
    modelName: `user`,
  });

  return User;
};
