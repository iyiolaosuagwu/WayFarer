import express from 'express';
import bookingController from '../controllers/booking';

const router = express();

// Booking Route
router.get('/v1/auth/bookings', bookingController.getAllBooking);

export default router;
