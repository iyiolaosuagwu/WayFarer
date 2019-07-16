/* eslint-disable camelcase */
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import userQueries from '../models/userQuery';


// Load Input Validation
import validateRegisterInput from '../validation/signup';
import validateLoginInput from '../validation/signin';

dotenv.config();
const { env } = process;

const userController = {};

// @route    GET api/users
// @desc     get all registered user;
// @access   Private
userController.getAllUser = async (req, res) => {
   const { is_admin } = req.body;
   try {
      if (!req.body.is_admin) {
         return res.json({ error: 'only admin can view all user' });
      }

      const user = await userQueries.findAllUser();

      if (!user.length) {
         return res.json({ error: 'Users not found' });
      }

      return res.status(200).json({
         status: 'success',
         data: user
      });
   } catch (error) {
      return res.status(500).json({ status: 'error', error: 'Internal server error' });
   }
};


// @route    POST api/users
// @desc     Register user
// @access   Public
userController.signupUser = async (req, res) => {
   const { errors, isValid } = validateRegisterInput(req.body);

   // Check Validation
   if (!isValid) return res.status(400).json(errors);

   const {
      firstname,
      lastname,
      email,
      password
   } = req.body;

   try {
      const existingUser = await userQueries.findUserByEmail(email);
      if (existingUser) {
      return res.status(400).json({
            error: 'Email Already Exists'
         });
      }
      // hashing password
      const salt = await bcrypt.genSalt(10);

      const passwordHash = await bcrypt.hash(password, salt);

      const newUser = await userQueries.createUser(firstname, lastname, email, passwordHash);

      const payload = {
         user_id: newUser.id,
         is_admin: newUser.is_admin
      };

      jwt.sign(
      payload,
      env.JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
         if (err) throw err;
         res.json({ 
            status: 'success',
            token,
            message: "User signup was successfull"
          });
      }
      );
   } catch (error) {
      return res.status(400).json({
         status: 'error',
         error: 'oops! something went wrong went wrong'
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
               error: 'oops! something went wrong went wrong'
            });
         }

         const passwordsMatch = await bcrypt.compare(password, loggedinUser.password);
         if (!passwordsMatch) {
            return res
            .status(400)
            .json({ error: 'oops! something went wrong went wrong' });
         }

         const payload = {
            loggedinUser: {
            user_id: loggedinUser.id,
            is_admin: loggedinUser.is_admin
            }
         };

         jwt.sign(
            payload,
            env.JWT_SECRET,
            { expiresIn: 36000 },
            (err, token) => {
            if (err) throw err;
            res.json({ token });
            }
         );
      } catch (error) {
         return res.status(400).json({
            status: 'error',
            error: 'oops! something went wrong went wrong'
         });
      }
};


export default userController;
