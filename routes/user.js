import express from 'express';
import userController from '../controllers/user';
import auth from '../middleware/auth';

const router = express();

router.get('/v1/users', auth, userController.getAllUser);
router.post('/v1/auth/signup', userController.signupUser);
router.post('/v1/auth/signin', userController.signinUser);

export default router;
