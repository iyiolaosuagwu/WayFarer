import express from 'express';
import userController from '../controllers/user';

const router = express();

// User Route
router.get('/', userController.getAllUser);
router.get('/register', userController.registerUser);
router.get('/login', userController.loginUser);
router.get('/logout', userController.logoutUser);

export default router;
