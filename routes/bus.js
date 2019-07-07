import express from 'express';
import busController from '../controllers/bus';

const router = express();

// Booking Route
router.get('/v1/auth/bus', busController.getAllBus);

export default router;
