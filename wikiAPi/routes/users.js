const express = require('express');
const secure = require('../auth/secure');
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../services/user');

const userApi = (app) => {
  const router = express.Router();
  app.use('/api/users', router);

  router.get('/', async (req, res, next) => {
    try {
      const users = await getUsers();
      res.status(200).json({
        data: users,
        message: 'Users listed',
      });
    } catch (error) {
      next(error);
    }
  });

  router.get('/:userId', async (req, res, next) => {
    const { userId: id } = req.params;
    try {
      const user = await getUser(id);
      res.status(200).json({
        data: user,
        message: 'User listed',
      });
    } catch (error) {
      next(error);
    }
  });

  router.post('/', async (req, res, next) => {
    const data = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    };
    try {
      const user = await createUser(data);
      res.status(201).json({
        data: user,
        message: 'User created',
      });
    } catch (error) {
      next(error);
    }
  });

  router.put('/:userId', secure('update'), async (req, res, next) => {
    const { userId: id } = req.params;
    const data = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
    };

    try {
      const user = await updateUser(id, data);
      res.status(200).json({
        data: user,
        message: 'User updated',
      });
    } catch (error) {
      next(error);
    }
  });

  router.delete('/:userId', secure('delete'), async (req, res, next) => {
    const { userId: id } = req.params;

    try {
      const user = await deleteUser(id);
      res.status(200).json({
        data: user,
        message: 'User deleted',
      });
    } catch (error) {
      next(error);
    }
  });
};

module.exports = userApi;
