const jwt = require('jsonwebtoken');
const { NODE_ENV, JWT_SECRET } = process.env;

const handleAuthError = (res) => {
  res
    .status(401)
    .send({ message: 'Необходима авторизация' });
};

// const extractBearerToken = (header) => { header.replace('Bearer ', '') };

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(res);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV !== 'production' ? 'test-secret-word' : JWT_SECRET );
  } catch (err) {
    return handleAuthError(res);
  }
  req.user = payload;
  return next();
};
