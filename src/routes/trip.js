import express from 'express';
import tripController from '../controllers/trip';
import auth from '../middleware/auth';

const router = express();

// Booking Route
router.get('/v1/trips', auth, tripController.getAllTrip);
router.patch('/v1/trips/:tripId', auth, tripController.cancelTrip);
router.post('/v1/trips', auth, tripController.createTrip);


// test
router.get('/api/v1/test', (req, res) => res.status(200).json({ msg: 'yes it worked' }));
export default router;
