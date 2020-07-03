const models = require('../models');

module.exports = {
  async getComments() {
    const comments = await models.Comment.findAll({
      include: [
        {
          all: true,
        },
      ],
    });
    return comments || [];
  },

  async getComment(id) {
    const comment = await models.Comment.findOne({
      where: { id: id },
      include: [
        {
          all: true,
        },
      ],
    });
    if (comment) {
      return comment;
    } else {
      return res
        .status(404)
        .send('Comment with the specified ID does not exists');
    }
  },

  async createComment(data) {
    const createdCommentId = await models.Comment.create(data, {
      include: { all: true },
    });
    return createdCommentId || {};
  },

  async updateComment(id, data) {
    const updated = await models.Comment.update(data, {
      where: {
        id: id,
      },
    });
    if (updated) {
      const updatedComment = await models.Comment.findOne({
        where: { id: id },
      });
      return updatedComment;
    }
  },

  async deleteComment(id) {
    const existingComment = await models.Comment.findByPk(id);
    if (existingComment) {
      const deletedCommentId = await models.Comment.destroy({
        where: {
          id: id,
        },
      });
      return deletedCommentId;
    } else {
      return res
        .status(404)
        .send('Comment with the specified ID does not exists');
    }
  },
};
