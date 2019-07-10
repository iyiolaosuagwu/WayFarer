import tripQueries from '../models/tripQuery';
import userQueries from '../models/userQuery';

const tripController = {};


tripController.getAllTrip = async (req, res) => {
   try {
      const trip = await tripQueries.getAllTrips();

      if (!trip) {
         return res.json({ msg: 'Trips not found' });
      }

      return res.status(200).json({
         status: 'success',
         data: trip
      });
   } catch (error) {
      return res.status(400).json({
         status: 'error',
         error: `Internal server error ${error.message}`
      });
   }
};


tripController.createTrips = async (req, res) => {
   const {
      tripId, userId, firstName, lastName, origin, destination, tripDate, fare
   } = req.body;

   try {
      const User = await userQueries.findUserById(userId);

      if (!User) {
         return res.json({ msg: 'Trip does not exist' });
      }
      const newBooking = await tripQueries.createTrip(
         tripId, userId, firstName, lastName, origin, destination, tripDate, fare
      );
      return res.status(201).json({
         status: 'success',
         message: 'Trip was successfully created',
         data: newBooking
      });
   } catch (error) {
      res.status(500).json({
      status: 'error',
      error: 'Internal server error'
   });
   }
};


export default tripController;
