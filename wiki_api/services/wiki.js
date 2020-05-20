// const { wikiMock } = require('../utils/mocks/wiki');

const MongoLib = require('../lib/mongo');

class WikiServices {
  constructor() {
    this.collection = 'wikis';
    this.mongoDB = new MongoLib();
  }

  async getWikis() {
    const wikis = await this.mongoDB.getAll(this.collection);
    return wikis || [];
  }

  async getWiki({ wikiId }) {
    const wiki = await this.mongoDB.get(this.collection, wikiId);
    return wiki || {};
  }

  async createWiki({ wiki }) {
    const createWikiId = await this.mongoDB.create(this.collection, wiki);
    return createWikiId || {};
  }

  async updateWiki({ wikiId, wiki } = {}) {
    const updatedWikiId = await this.mongoDB.update(
      this.collection,
      wikiId,
      wiki
    );
    return updatedWikiId;
  }

  async deleteWiki({ wikiId }) {
    const deletedWikiId = await this.mongoDB.delete(this.collection, wikiId);
    return deletedWikiId;
  }
}

module.exports = WikiServices;
