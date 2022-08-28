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
    payload = jwt.verify(token, NODE_ENV !== 'production' ? 'test-secret-word' : JWT_SECRET : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzBhMDM3ZDhlMjUzMjQ3MTViY2U1ZDAiLCJpYXQiOjE2NjE2MDA2NzcsImV4cCI6MTY2MjIwNTQ3N30.tEUYfhAT0z0fKn9FMQaa1nd4RmQJDUoHNU91qM4H04w');
  } catch (err) {
    return handleAuthError(res);
  }
  req.user = payload;
  return next();
};
