const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// console.log('JWT_SECRET in controller:', JWT_SECRET);

exports.authenticateToken = (req, res, next) => {
    let token = null;
    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }
    // Fix: If token is missing or 'undefined', use cookie
    if ((!token || token === 'undefined') && req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }
    // console.log('Token from header:', authHeader);
    // console.log('Token from cookie:', req.cookies.token);
    // console.log('Token used for verify:', token);
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        console.log('JWT error:', err);
        return res.status(403).json({ message: 'Token is not valid', error: err.message } );
      }
      req.user = user;
      next();
    });
  };

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied: insufficient permissions' });
    }
    next();
  };
}; 