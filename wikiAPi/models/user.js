const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  User.beforeCreate(async (user, options) => {
    try {
      const hash = await bcrypt.hash(user.password, 10);
      user.password = hash;
    } catch (err) {
      throw new Error();
    }
  });

  User.associate = (models) => {
    User.hasMany(models.Post, {
      foreignKey: {
        allowNull: false,
        onDelete: 'CASCADE',
      },
    });
    User.hasMany(models.Comment, { onDelete: 'CASCADE' });
  };

  return User;
};
