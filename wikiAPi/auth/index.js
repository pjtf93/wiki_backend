const jwt = require('jsonwebtoken');
const { config } = require('../config');

const secreto = config.secret;

const sign = (data) => {
  return jwt.sign(data, secreto);
};

const verify = (token) => {
  return jwt.verify(token, secreto);
};

const check = {
  own: (req, owner) => {
    const decoded = decodeHeader(req);
    console.log(decoded);
    console.log(decoded.id);

    console.log(owner);

    // Comprobar si es o no propio
    if (decoded.id !== owner) {
      throw new Error('No puedes hacer esto');
    }
  },

  logged: (req, owner) => {
    const decoded = decodeHeader(req);

    if (!decoded.id) {
      throw new Error('No puedes hacer esto');
    }
  },
};

const getToken = (auth) => {
  if (!auth) {
    throw new Error('No viene token');
  }
  if (auth.indexOf('Bearer ') === -1) {
    throw new Error('Formato invalido');
  }
  let token = auth.replace('Bearer ', '');

  return token;
};

const decodeHeader = (req) => {
  const authorization = req.headers.authorization || '';
  console.log(authorization);

  const token = getToken(authorization);
  const decoded = verify(token);

  req.user = decoded;

  return decoded;
};

module.exports = {
  sign,
  verify,
  check,
};
