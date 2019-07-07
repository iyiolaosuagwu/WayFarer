import jwt from 'jsonwebtoken';
import tripQueries from '../models/tripQuery';
import userQueries from '../models/tripQuery';
import auth from '../middleware/auth';

const tripController = {};

tripController.getAllTrips = async (req, res) => {
   try {
      const booking = await tripQueries.findAllTrips();

      if (!booking) {
         return res.json({ msg: 'Bookings not found' });
      }

      return res.status(200).json({
         status: 'success',
         data: booking
      });
   } catch (error) {
      return res.status(404).json({ status: 'error', msg: 'Internal Server Error' });
   }
};

tripController.getTripId = async (req, res) => {
   const { tripId } = req.params;
   try {
      const trip = await tripQueries.findTripById(tripId);

    if (!trip) {
      return res.status(404).json({ msg: 'Trip not found' });
    }

    return res.status(200).json({
       status: 'success',
       data: trip
    });
   } catch (error) {
      return res.status(404).json({ status: 'error', msg: 'Internal Server Error' });
   }
};


tripController.createTrips = async (req, res) => {
   const {
      id, origin, destination, users
   } = req.body;

   const { user } = auth;

   try {
      const user = await users.getUserFromToken(id);
      const tripPost = tripQueries.createTrip(origin, destination);

      console.log('trip create', id);

      const payload = {
         user_id: user.id,
         origin: tripPost.origin,
         destination: tripPost.destination
      };

      return res.json({ payload });
   } catch (error) {
      return res.status(404).json({ status: 'error', msg: 'Internal Server Error' });
   }
};


export default tripController;
