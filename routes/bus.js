import express from 'express';
import busController from '../controllers/bus';
import auth from '../middleware/auth';

const router = express();

// Booking Route
router.post('/v1/auth/bus', auth, busController.createBus);


export default router;
