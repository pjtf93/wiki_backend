const joi = require('@hapi/joi');

const wikiIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const wikiTitleSchema = joi.string().max(80);
const wikiContentSchema = joi.string().max(800);
const wikiCreatedSchema = joi.date();
const wikiUpdatedSchema = joi.date();
const wikiCategorySchema = joi.string().min(6).max(16);
const wikiCommentsSchema = joi.string().max(200);
const wikiTagSchema = joi.array().items(joi.string().max(16));
const wikiUserSchema = joi.string().min(6).max(12);

const createWikiSchema = {
  title: wikiTitleSchema.required(),
  content: wikiContentSchema.required(),
  createdAt: wikiCreatedSchema.required(),
  category: wikiCategorySchema.required(),
  comments: wikiCommentsSchema,
  tags: wikiTagSchema,
  user: wikiUserSchema.required(),
};

const updateWikiSchema = {
  title: wikiTitleSchema,
  content: wikiContentSchema,
  updatedAt: wikiUpdatedSchema,
  category: wikiCategorySchema,
  comments: wikiCommentsSchema,
  tags: wikiTagSchema,
  user: wikiUserSchema,
};

module.exports = {
  wikiIdSchema,
  createWikiSchema,
  updateWikiSchema,
};
