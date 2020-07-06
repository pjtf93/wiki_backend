const express = require('express');

// const response = require('../../../network/response');
// const Controller = require('./index');

const { login } = require('../services/login');

const loginApi = (app) => {
  const router = express.Router();
  app.use('/api/login', router);

  router.post('/', async (req, res, next) => {
    try {
      const token = await login(req.body.email, req.body.password);
      res.status(201).json({
        token,
        message: 'acceso exitoso',
      });
    } catch (err) {
      next(err);
    }
  });
};

module.exports = loginApi;
