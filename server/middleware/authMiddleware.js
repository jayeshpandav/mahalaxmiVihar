const jwt = require('jsonwebtoken');
const User = require('../models/User');
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// console.log('JWT_SECRET in controller:', JWT_SECRET);

exports.authenticateToken = async (req, res, next) => {
  try {
    const token = req.cookies.token || (req.headers['authorization'] && req.headers['authorization'].split(' ')[1]);
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });
    
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    req.user = { id: user._id, username: user.username, role: user.role };
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