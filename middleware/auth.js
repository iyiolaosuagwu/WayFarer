
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
// import config from '../config/index';

dotenv.config();
const { env } = process;

module.exports = async (req, res, next) => {
  // Get token from Headers
  const token = req.header('x-auth-token');

  // check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No Token, authorization denied..' });
  }

  //   Verify Token
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);

    // set user to the decoded user
    req.user = decoded.user;
    //
    // call next
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not Valid' });
  }
};

// this auth file is used for protected routes
