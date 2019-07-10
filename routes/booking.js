import express from 'express';
import bookingController from '../controllers/booking';
import auth from '../middleware/auth';

const router = express();

// Booking Route
router.get('/v1/auth/bookings/', auth, bookingController.getAllBooking);
// router.get('/v1/auth/bookings/:userId', auth, bookingController.findBookingById);
router.post('/v1/auth/bookings/:userId', auth, bookingController.createBooking);
router.delete('/v1/auth/bookings/:bookingId', auth, bookingController.createBooking);


export default router;
