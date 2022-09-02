const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const { Unauthorized } = require('../utils/errors/UnauthorizedError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Unauthorized('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV !== 'production' ? 'super-strong-secret' : JWT_SECRET);
  } catch (err) {
    throw new Unauthorized('Необходима авторизация');
  }
  req.user = payload;
  return next();
};
