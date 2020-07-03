const models = require('../models');

module.exports = {
  async getPosts() {
    const posts = await models.Post.findAll({
      include: [
        {
          all: true,
        },
      ],
    });
    return posts || [];
  },

  async getPost(id) {
    const post = await models.Post.findOne({
      where: { id: id },
      include: [
        {
          all: true,
        },
      ],
    });
    if (post) {
      return post;
    } else {
      return res.status(404).send('Post with the specified ID does not exists');
    }
  },

  async createPost(data) {
    const createdPostId = await models.Post.create(data, {
      include: { all: true },
    });
    return createdPostId || {};
  },

  async updatePost(id, data) {
    const updated = await models.Post.update(data, {
      where: {
        id: id,
      },
    });
    if (updated) {
      const updatedPost = await models.Post.findOne({
        where: { id: id },
      });
      return updatedPost;
    }
  },

  async deletePost(id) {
    const existingPost = await models.Post.findByPk(id);
    if (existingPost) {
      const deletedPostId = await models.Post.destroy({
        where: {
          id: id,
        },
      });
      return deletedPostId;
    } else {
      return res.status(404).send('Post with the specified ID does not exists');
    }
  },
};
