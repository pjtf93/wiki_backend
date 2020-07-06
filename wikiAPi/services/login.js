const bcrypt = require('bcrypt');
const auth = require('../auth/index');
const models = require('../models');

module.exports = {
  async login(email, password) {
    const data = await models.User.findOne({ where: { email: email } });
    console.log(data.id);

    const equals = await bcrypt.compare(password, data.password);

    if (equals === true) {
      const authenticated = auth.sign(data.toJSON());
      return data, authenticated;
    } else {
      throw new Error('informacion invalida');
    }
  },
};
