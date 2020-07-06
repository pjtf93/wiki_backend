const auth = require('.');

module.exports = checkAuth = (action) => {
  const middleware = (req, res, next) => {
    const owner = req.body.id;

    switch (action) {
      case 'create':
        auth.check.logged(req);
        next();
        break;

      case 'update':
        auth.check.own(req, owner);
        next();
        break;

      case 'delete':
        auth.check.own(req, owner);
        next();
        break;
      default:
        next();
    }
  };
  return middleware;
};

// case delete
