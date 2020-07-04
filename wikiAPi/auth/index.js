const jwt = require('jsonwebtoken');
const config = require('../config');
const secret = config.jwt.secret;

const sign = (data) => {
  return jwt.sign(data, secret);
};

const verify = (token) => {
  return jwt.verify(token, secret);
};

const check = {
  own: (req, owner) => {
    const decoded = decodeHeader(req);
    console.log(decoded);
    // Comprobar si es o no propio
    if (decoded.id !== owner) {
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
  const token = getToken(authorization);
  const decoded = jwt.verify(token);

  req.user = decoded;

  return decoded;
};

module.exports = {
  sign,
  verify,
  check,
};
