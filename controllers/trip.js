import tripQueries from '../models/tripQuery';
import userQueries from '../models/userQuery';
// Load Input Validation
import validateTripInput from '../validation/trip';

const tripController = {};


tripController.getAllTrip = async (req, res) => {
   try {
      const trip = await tripQueries.getAllTrips();

      if (!trip) {
         return res.json({ msg: 'Trips not found' });
      }

      return res.status(200).json({
         status: 'success',
         body: req.body,
         data: trip
      });
   } catch (error) {
      return res.status(400).json({
         status: 'error',
         error: `Internal server error ${error.message}`
      });
   }
};


tripController.createTrip = async (req, res) => {
   const { errors, isValid } = validateTripInput(req.body);

   // Check Validation
   if (!isValid) return res.status(400).json(errors);

   const {
      user_id,
      bus_id,
      origin,
      destination,
      fare,
      status
   } = req.body;
   try {
      if (!req.body.is_admin) {
         return res.json({ error: 'only admin can create a trip' });
      }

      const newTrip = await tripQueries.createTrips(user_id, bus_id, origin, destination, fare, status);

      const payload = {
         id: newTrip.id,
         owner: req.body.user_id,
         bus_id: newTrip.bus_id,
         origin: newTrip.origin,
         destination: newTrip.destination,
         trip_date: newTrip.trip_date,
         fare: newTrip.fare,
         status: newTrip.status
      };
      return res.status(200).json({
         status: 'success',
         data: payload,
         message: 'Trip was successfully created'
      });
   } catch (error) {
      console.log((error));
   }
};


export default tripController;
