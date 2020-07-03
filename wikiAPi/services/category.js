const models = require('../models');

module.exports = {
  async getCategorys() {
    const categorys = await models.Category.findAll({
      include: [
        {
          all: true,
        },
      ],
    });
    return categorys || [];
  },

  async getCategory(id) {
    const category = await models.Category.findOne({
      where: { id: id },
      include: [
        {
          all: true,
        },
      ],
    });
    if (category) {
      return category;
    } else {
      return res
        .status(404)
        .send('Category with the specified ID does not exists');
    }
  },

  async createCategory(data) {
    const createdCategoryId = await models.Category.create(data, {
      include: { all: true },
    });
    return createdCategoryId || {};
  },

  async updateCategory(id, data) {
    const updated = await models.Category.update(data, {
      where: {
        id: id,
      },
    });
    if (updated) {
      const updatedCategory = await models.Category.findOne({
        where: { id: id },
      });
      return updatedCategory;
    }
  },

  async deleteCategory(id) {
    const existingCategory = await models.Category.findByPk(id);
    if (existingCategory) {
      const deletedCategoryId = await models.Category.destroy({
        where: {
          id: id,
        },
      });
      return deletedCategoryId;
    } else {
      return res
        .status(404)
        .send('Category with the specified ID does not exists');
    }
  },
};
