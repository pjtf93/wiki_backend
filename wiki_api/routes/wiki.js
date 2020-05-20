const express = require('express');
const WikiServices = require('../services/wiki');

const {
  wikiIdSchema,
  createWikiSchema,
  updateWikiSchema,
} = require('../utils/schemas/wiki');

const validationHandler = require('../utils/middleware/validationHandler');

const wikiApi = (app) => {
  const router = express.Router();
  app.use('/api', router);

  const wikiService = new WikiServices();

  router.get('/', async (req, res, next) => {
    try {
      const wikis = await wikiService.getWikis();
      // throw new Error('Error getting movies');
      res.status(200).json({
        data: wikis,
        message: 'wikis listed',
      });
    } catch (error) {
      next(error);
    }
  });

  router.get(
    '/:wikiId',
    validationHandler({ wikiId: wikiIdSchema }, 'params'),
    async (req, res, next) => {
      const { wikiId } = req.params;
      try {
        const wikis = await wikiService.getWiki({ wikiId });
        res.status(200).json({
          data: wikis,
          message: 'wiki listed',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.post(
    '/',
    validationHandler(createWikiSchema),
    async (req, res, next) => {
      const { body: wiki } = req;
      try {
        const wikis = await wikiService.createWiki({ wiki });
        res.status(201).json({
          data: wikis,
          message: 'wiki created',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.put(
    '/:wikiId',
    validationHandler({ wikiId: wikiIdSchema }, 'params'),
    validationHandler(updateWikiSchema),
    async (req, res, next) => {
      const { wikiId } = req.params;
      const { body: wiki } = req;

      try {
        const wikis = await wikiService.updateWiki({ wikiId, wiki });
        res.status(200).json({
          data: wikis,
          message: 'wikis updated',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.delete(
    '/:wikiId',
    validationHandler({ wikiId: wikiIdSchema }, 'params'),
    async (req, res, next) => {
      const { wikiId } = req.params;

      try {
        const wikis = await wikiService.deleteWiki({ wikiId });
        res.status(200).json({
          data: wikis,
          message: 'wiki deleted',
        });
      } catch (error) {
        next(error);
      }
    }
  );
};

module.exports = wikiApi;
