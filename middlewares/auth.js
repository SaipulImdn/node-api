const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).send('Access denied. No token provided');
  }

  jwt.verify(token, 'secret', (err, decoded) => {
    if (err) {
      console.error('Error verifying token:', err);
      return res.status(401).send('Invalid token');
    }
    req.userId = decoded.userId;
    next();
  });
};

module.exports = verifyToken;
