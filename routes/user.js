import express from 'express';
import userController from '../controllers/user';

const router = express();

router.get('/v1/auth/users', userController.getAllUser);
router.post('/v1/auth/signup', userController.signupUser);
router.post('/v1/auth/signin', userController.signinUser);

export default router;
