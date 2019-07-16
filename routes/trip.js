import express from 'express';
import tripController from '../controllers/trip';
import auth from '../middleware/auth';

const router = express();

// Booking Route
router.get('/v1/trips', auth, tripController.getAllTrip);
router.patch('/v1/trips/:tripId', auth, tripController.cancelTrip);
router.post('/v1/trips', auth, tripController.createTrip);

export default router;
