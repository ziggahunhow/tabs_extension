'use strict';
const uuid = require('uuid/v4');

module.exports = (sequelize, DataTypes) => {
  const Bookmark = sequelize.define(
    'Bookmark',
    {
      id: {
        // allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID
      },
      title: { type: DataTypes.STRING, allowNull: false },
      url: { type: DataTypes.STRING, allowNull: false },
      favIconUrl: { type: DataTypes.STRING },
      position: DataTypes.INTEGER
    },
    {}
  );
  Bookmark.associate = function(models) {
    Bookmark.belongsTo(models.User);
  };
  Bookmark.beforeCreate(Bookmark => (Bookmark.id = uuid()));
  return Bookmark;
};
