import express from 'express';
import tripController from '../controllers/trip';
import auth from '../middleware/auth';

const router = express();

// Booking Route
router.get('/v1/auth/trips', auth, tripController.getAllTrip);

export default router;
