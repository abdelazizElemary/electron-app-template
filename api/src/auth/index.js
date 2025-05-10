const jwt = require('jsonwebtoken');
const { config } = require('../../config');

const {
  jwt: { jwtSecret, jwtUserID },
} = config.get();

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization && authorization.startsWith('Bearer ')) {
    const token = authorization.split(' ')[1];
    jwt.verify(token, jwtSecret, {}, async (err, decoded) => {
      if (err || decoded.id !== jwtUserID) {
        return res.status(401).json({ message: 'No admin access' });
      }
      req.user = decoded;
      next();
    });
  } else {
    return res.status(401).json({ message: 'No admin access' });
  }
};

module.exports = {
  auth,
};
