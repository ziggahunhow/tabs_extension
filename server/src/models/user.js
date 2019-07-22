'use strict';
const uuid = require('uuid/v4');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        // allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID
      },
      name: { type: DataTypes.STRING, allowNull: false },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { isEmail: true },
        unique: {
          args: true,
          msg: 'Email address already in use!'
        }
      },
      password: { type: DataTypes.STRING, allowNull: false }
    },
    {}
  );
  User.associate = function(models) {
    User.hasMany(models.Bookmark, {
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    });
  };
  User.beforeCreate(user => {
    return (user.id = uuid());
  });
  // User.beforeCreate((user, options) => {
  //   return hashPassword(user.password).then(hashedPw => {
  //     user.password = hashedPw;
  //   });
  // });
  return User;
};
