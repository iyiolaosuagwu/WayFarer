import express from 'express';
import bookingController from '../controllers/booking';

const router = express();

// Booking Route
router.get('/', bookingController.getAllBooking);

export default router;
