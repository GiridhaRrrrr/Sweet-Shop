import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import wrapAsync from '../utils/wrapAsync.js';

export const protect = wrapAsync(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    req.user = await User.findById(decoded.id).select('-password');
    
    next();
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
});

export const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as an admin' });
  }
};