module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('comment', {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Comment.associate = (models) => {
    Comment.belongsTo(models.Post);
    Comment.belongsTo(models.User);
  };

  return Comment;
};
