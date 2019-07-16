import tripQueries from '../models/tripQuery';
import busQueries from '../models/busQuery';
// Load Input Validation
import validateTripInput from '../validation/trip';

const tripController = {};

// @route    GET api/trip
// @desc     get all trips
// @access   Private
tripController.getAllTrip = async (req, res) => {
   const filterBy = req.query.filter_by;
   const searchQuery = req.body.search_query;
   let trip;
   try {
      if (filterBy !== undefined && filterBy !== '' && filterBy !== null) {
         if (filterBy === 'origin' && searchQuery) {
            trip = await tripQueries.getTripsByOrigin(searchQuery);
         }
         if (filterBy === 'destination' && searchQuery) {
           trip = await tripQueries.getTripsByDestination(searchQuery);
         }
      } else {
         trip = await tripQueries.getAllTrips();
      }
      if (!trip.length) {
         return res.json({ error: 'Trips not found' });
      }

      return res.status(200).json({
         status: 'success',
         data: trip
      });
   } catch (error) {
      return res.status(500).json({
         status: 'error',
         error: 'oops! something went wrong went wrong'
      });
   }
};



// @route    PATCH api/trip
// @desc     Admin cancel trip
// @access   Private
tripController.cancelTrip = async (req, res) => {
   const { tripId } = req.params;
   try {

   if (!req.body.is_admin) {
      return res.json({ error: 'only admin can view all user' });
   }

   const trip = await tripQueries.getTripById(tripId);

   if (!trip.length) {
      return res.json({ error: 'This trip is not available' });
   }

   const tripStatus = trip.status ? false : trip.status;

   await tripQueries.updateTripById(tripId);

   const payload = {
      id: trip.id,
      owner: req.body.user_id,
      bus_id: trip.bus_id,
      origin: trip.origin,
      destination: trip.destination,
      trip_date: trip.trip_date,
      fare: trip.fare,
      status: tripStatus
   };

   return res.status(200).json({
      status: 'success',
      data: payload,
      message: 'Trip was successfully cancel'
   });
   } catch (error) {
         return res.status(500).json({ error: 'oops! something went wrong' });
      }
};

// @route    POST api/trip
// @desc     create trips
// @access   Private
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
      // check if admin
      if (!req.body.is_admin) {
         return res.json({ error: 'only admin can create a trip' });
      }

      // validate bus ID
      const bus = await busQueries.findID(bus_id);
      if(!bus.length){
         return res.json({ error: 'Bus not found, make sure a bus is available' });
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
      return res.status(500).json({
         status: 'error',
         error: 'oops! something went wrong went wrong'
      });
   }
};



export default tripController;
