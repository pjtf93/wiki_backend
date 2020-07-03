const models = require('../models');

module.exports = {
  async getUsers() {
    const users = await models.User.findAll({
      include: [
        {
          all: true,
        },
      ],
    });
    return users || [];
  },

  async getUser(id) {
    console.log(id);

    const user = await models.User.findOne({
      where: { id: id },
      include: [
        {
          all: true,
        },
      ],
    });
    if (user) {
      return user;
    } else {
      return res.status(404).send('User with the specified ID does not exists');
    }
  },

  async createUser(data) {
    const createdUserId = await models.User.create(data, {
      include: { all: true },
    });
    return createdUserId || {};
  },

  async updateUser(id, data) {
    const updated = await models.User.update(data, {
      where: {
        id: id,
      },
    });
    if (updated) {
      const updatedUser = await models.User.findOne({
        where: { id: id },
      });
      return updatedUser;
    }
  },

  async deleteUser(id) {
    const existingUser = await models.User.findByPk(id);
    if (existingUser) {
      const deletedUserId = await models.User.destroy({
        where: {
          id: id,
        },
      });
      return deletedUserId;
    } else {
      return res.status(404).send('User with the specified ID does not exists');
    }
  },
};
