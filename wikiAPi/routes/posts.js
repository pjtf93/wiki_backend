const express = require('express');
const secure = require('../auth/secure');

const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require('../services/post');

const postApi = (app) => {
  const router = express.Router();
  app.use('/api/posts', router);

  router.get('/', async (req, res, next) => {
    try {
      const posts = await getPosts();
      res.status(200).json({
        data: posts,
        message: 'Posts listed',
      });
    } catch (error) {
      next(error);
    }
  });

  router.get('/:postId', async (req, res, next) => {
    const { postId: id } = req.params;
    try {
      const post = await getPost(id);
      res.status(200).json({
        data: post,
        message: 'Post listed',
      });
    } catch (error) {
      next(error);
    }
  });

  router.post('/', secure('create'), async (req, res, next) => {
    const data = {
      title: req.body.title,
      content: req.body.content,
      userId: req.body.userId,
      categoryId: req.body.categoryId,
    };
    try {
      const post = await createPost(data);
      res.status(201).json({
        data: post,
        message: 'Post created',
      });
    } catch (error) {
      next(error);
    }
  });

  router.put('/:postId', secure('update'), async (req, res, next) => {
    const { postId: id } = req.params;
    const data = {
      title: req.body.title,
      content: req.body.content,
      categoryId: req.body.categoryId,
    };
    try {
      const post = await updatePost(id, data);
      res.status(200).json({
        data: post,
        message: 'Post updated',
      });
    } catch (error) {
      next(error);
    }
  });

  router.delete('/:postId', secure('delete'), async (req, res, next) => {
    const { postId: id } = req.params;

    try {
      const post = await deletePost(id);
      res.status(200).json({
        data: post,
        message: 'Post deleted',
      });
    } catch (error) {
      next(error);
    }
  });
};

module.exports = postApi;
