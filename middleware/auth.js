
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import userQueries from '../models/userQuery';

dotenv.config();
const { env } = process;

module.exports = async (req, res, next) => {
  // Get token from Headers
  const token = req.headers.authorization;

  // check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No Token, authorization denied..' });
  }

  //   Verify Token
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);

    // set user to the decoded user
    req.id = decoded.id;
    req.users = decoded.users;
    //
    // call next
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not Valid' });
  }
};


const getUserFromToken = async (token) => {
    try {
        const decoded = jwt.verify(token, env.JWT_SECRET);
        const { id } = decoded;
        const users = await userQueries.findUserById(id);
        return users;
    } catch (error) {
        return false;
    }
};


export default getUserFromToken;
// this auth file is used for protected routes
