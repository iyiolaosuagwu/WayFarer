import express from 'express';
import bookingController from '../controllers/booking';
import auth from '../middleware/auth';

const router = express();

// Booking Route

router.get('/v1/bookings/', auth, bookingController.getAllBooking);
router.get('/v1/bookings/:bookingId', auth, bookingController.getBookingsById);
router.get('/v1/user/bookings', auth, bookingController.getUserBookings);
router.delete('/v1/bookings/:bookingId', auth, bookingController.deleteBookingById);
router.post('/v1/bookings/', auth, bookingController.createBooking);
export default router;
