const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  const authHeader = req.get('authorization');

  if (!authHeader) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  const [scheme, token] = authHeader.split(' ');
  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'A valid Bearer token is required' });
  }

  try {
    req.auth = jwt.verify(token, process.env.JWT_SECRET);
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

const isAdmin = (req, res, next) => {
  if (!req.auth) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  if (req.auth.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }

  return next();
};

module.exports = {
  authenticateJWT,
  isAdmin
};
