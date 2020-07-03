const express = require('express');
const {
  getComment,
  getComments,
  createComment,
  updateComment,
  deleteComment,
} = require('../services/comment');

const commentApi = (app) => {
  const router = express.Router();
  app.use('/api/comments', router);

  router.get('/', async (req, res, next) => {
    try {
      const comments = await getComments();
      res.status(200).json({
        data: comments,
        message: 'Comments listed',
      });
    } catch (error) {
      next(error);
    }
  });

  router.get('/:commentId', async (req, res, next) => {
    const { commentId: id } = req.params;
    try {
      const comment = await getComment(id);
      res.status(200).json({
        data: comment,
        message: 'Comment listed',
      });
    } catch (error) {
      next(error);
    }
  });

  router.post('/', async (req, res, next) => {
    const data = {
      content: req.body.content,
      postId: req.body.postId,
      userId: req.body.userId,
    };
    try {
      const comment = await createComment(data);
      res.status(201).json({
        data: comment,
        message: 'Comment created',
      });
    } catch (error) {
      next(error);
    }
  });

  router.put('/:commentId', async (req, res, next) => {
    const { commentId: id } = req.params;
    const data = {
      content: req.body.content,
      postId: req.body.postId,
      userId: req.body.userId,
    };
    try {
      const comment = await updateComment(id, data);
      res.status(200).json({
        data: comment,
        message: 'Comment updated',
      });
    } catch (error) {
      next(error);
    }
  });

  router.delete('/:commentId', async (req, res, next) => {
    const { commentId: id } = req.params;

    try {
      const comment = await deleteComment(id);
      res.status(200).json({
        data: comment,
        message: 'Comment deleted',
      });
    } catch (error) {
      next(error);
    }
  });
};

module.exports = commentApi;
