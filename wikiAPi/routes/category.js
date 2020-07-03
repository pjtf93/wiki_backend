const express = require('express');
const {
  getCategory,
  getCategorys,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../services/category');

const categoryApi = (app) => {
  const router = express.Router();
  app.use('/api/categorys', router);

  router.get('/', async (req, res, next) => {
    try {
      const categorys = await getCategorys();
      res.status(200).json({
        data: categorys,
        message: 'Categorys listed',
      });
    } catch (error) {
      next(error);
    }
  });

  router.get('/:categoryId', async (req, res, next) => {
    const { categoryId: id } = req.params;
    try {
      const category = await getCategory(id);
      res.status(200).json({
        data: category,
        message: 'Category listed',
      });
    } catch (error) {
      next(error);
    }
  });

  router.post('/', async (req, res, next) => {
    const data = {
      name: req.body.name,
    };
    try {
      const category = await createCategory(data);
      res.status(201).json({
        data: category,
        message: 'Category created',
      });
    } catch (error) {
      next(error);
    }
  });

  router.put('/:categoryId', async (req, res, next) => {
    const { categoryId: id } = req.params;
    const data = {
      name: req.body.name,
    };
    try {
      const category = await updateCategory(id, data);
      res.status(200).json({
        data: category,
        message: 'Category updated',
      });
    } catch (error) {
      next(error);
    }
  });

  router.delete('/:categoryId', async (req, res, next) => {
    const { categoryId: id } = req.params;

    try {
      const category = await deleteCategory(id);
      res.status(200).json({
        data: category,
        message: 'Category deleted',
      });
    } catch (error) {
      next(error);
    }
  });
};

module.exports = categoryApi;
