import express from 'express';
import busController from '../controllers/bus';
import auth from '../middleware/auth';

const router = express();

// Booking Route
router.get('/v1/bus', auth, busController.getAllBus);
router.post('/v1/bus', auth, busController.createNewBus);

export default router;
