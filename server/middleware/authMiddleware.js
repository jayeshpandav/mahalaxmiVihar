const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// console.log('JWT_SECRET in controller:', JWT_SECRET);

exports.authenticateToken = async (req, res, next) => {
  try {
    const token = req.cookies.token || (req.headers['authorization'] && req.headers['authorization'].split(' ')[1]);
    
    // Debug logging
    console.log('Token from cookie:', req.cookies.token);
    console.log('Token from header:', req.headers['authorization']);
    console.log('Final token used:', token);
    console.log('Token type:', typeof token);
    console.log('Token length:', token ? token.length : 0);
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }
    
    // Simple JWT verification without database lookup
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Use the decoded JWT payload directly
    next();
  } catch (err) {
    console.log('JWT error:', err);
    return res.status(403).json({ message: 'Token is not valid', error: err.message });
  }
};

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied: insufficient permissions' });
    }
    next();
  };
}; 