import express from 'express';
import tripsController from '../controllers/trips';
import auth from '../middleware/auth';

const router = express();

// Booking Route
router.get('/v1/auth/trips/', auth, tripsController.getAllTrips);
router.get('/v1/auth/trips/:tripId', auth, tripsController.getTripId);
router.post('/v1/auth/trips/', auth, tripsController.createTrips);

export default router;
