// this auth file is used for protected routes
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
const { env } = process;

module.exports = async (req, res, next) => {
  // Get token from Headers
  const token = req.header('x-auth-token');

  // check if not token
  if (!token) {
    return res.status(401).json({ error: 'No Token, authorization denied..' });
  }

  //   Verify Token
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);

    // set user to the decoded user
    // set is_admin to the decoded user
    req.body.user_id = decoded.loggedinUser.user_id;
    req.body.is_admin = decoded.loggedinUser.is_admin;
    //
    // call next
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token is not Valid' });
  }
};
