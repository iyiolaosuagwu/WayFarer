/* eslint-disable camelcase */
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { userQueries } from '../models/userQuery';


// Load Input Validation
import validateRegisterInput from '../validation/register';
import validateLoginInput from '../validation/login';

dotenv.config();
const { env } = process;


const userController = {};


// @route    POST api/users
// @desc     Register user
// @access   Public
userController.signupUser = async (req, res) => {
   const { errors, isValid } = validateRegisterInput(req.body);

   // Check Validation
   if (!isValid) return res.status(400).json(errors);

   const {
      first_name,
      last_name,
      email,
      password
   } = req.body;

   try {
      const existingUser = await userQueries.findUserByEmail(email);
      if (existingUser) {
      return res.status(400).json({
            msg: 'Email Already Exists'
         });
      }
      // hashing password
      const salt = await bcrypt.genSalt(10);

      const passwordHash = await bcrypt.hash(password, salt);

      const newUser = await userQueries.createUser(first_name, last_name, email, passwordHash);

      const payload = {
         User: {
            user_id: newUser.id
         }
      };

      const { user_id } = payload.User;
      jwt.sign(
      payload,
      env.JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
         if (err) throw err;
         res.json({ token, user_id });
      }
      );
      console.log('reg');
   } catch (error) {
      return res.status(500).json({
         status: 'error',
         msg: `${error.message}`
      });
   }
};


// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
userController.signinUser = async (req, res) => {
   const { errors, isValid } = validateLoginInput(req.body);

   // Check Validation
   if (!isValid) return res.status(400).json(errors);

      const { email, password } = req.body;
      try {
         const loggedinUser = await userQueries.findUserByEmail(email);

         if (!loggedinUser) {
            return res.status(400).json({
               msg: 'Invalid credentials'
            });
         }

         const passwordsMatch = await bcrypt.compare(password, loggedinUser.password);
         if (!passwordsMatch) {
            return res
            .status(400)
            .json({ msg: 'Invalid Credentialsr' });
         }

         const payload = {
            loggedinUser: {
            user_id: loggedinUser.id,
            is_admin: loggedinUser.is_admin
            }
         };

         const { user_id, is_admin } = payload.loggedinUser;

         jwt.sign(
            payload,
            env.JWT_SECRET,
            { expiresIn: 36000 },
            (err, token) => {
            if (err) throw err;
            res.json({ token, user_id, is_admin });
            }
         );

         console.log('logged in');
      } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
      }
};


export default userController;
