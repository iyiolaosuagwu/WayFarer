import bookingQueries from '../models/bookingQuery';
import userQueries from '../models/userQuery';
import tripQueries from '../models/tripQuery';
import busQueries from '../models/busQuery';
import connection from '../database/connection';

// validator
import validateBookingInput from '../validation/booking';

const bookingController = {};

// @route    GET api/bookings
// @desc     get all bookings
// @access   Private
bookingController.getAllBooking = async (req, res) => {
   try {
      if (!req.body.is_admin) {
      return res.json({ error: 'only admin can view all user' });
   }
      const booking = await bookingQueries.getAllBookings();

      if (!booking.length) {
         return res.json({ error: 'Bookings not found' });
      }

      return res.status(200).json({
         status: 'success',
         data: booking
      });
   } catch (error) {
      return res.status(500).json({
         status: 'error',
         error: 'oops! something went wrong went wrong'
      });
   }
};

// @route    GET api/bookings
// @desc     get all user bookings
// @access   Private
bookingController.getUserBookings = async (req, res) => {
   const { user_id: userid } = req.body;
   try {
      const trips = await bookingQueries.getAllUserBookings(userid);

      if (!trips) {
         return res.json({ error: 'No booking available' });
      }

      return res.status(200).json({
         status: 'success',
         data: trips
      });
   } catch (error) {
      return res.status(500).json({
         status: 'error',
         error: 'oops! something went wrong went wrong'
      });
   }
};

// @route    GET api/bookings
// @desc     get bookings by booking ID
// @access   Private
bookingController.getBookingsById = async (req, res) => {
    const { bookingId } = req.params;
    try {
      const booking = await bookingQueries.getBookingById(bookingId);

      if (!booking.length) {
         return res.json({ error: 'This booking is not available' });
      }

      res.status(200).json({
         status: 'success',
         data: booking
      });
    } catch (error) {
        return res.status(500).json({ error: 'oops! something went wrong went wrong' });
    }
};


// @route    POST api/bookings
// @desc     Create bookings
// @access   Private
bookingController.createBooking = async (req, res) => {
   const { errors, isValid } = validateBookingInput(req.body);

   // Check Validation
   if (!isValid) return res.status(400).json(errors);

   const {
      user_id,
      tripid,
      busid,
      seatnumber,
      firstname,
      lastname,
      email
   } = req.body;
   try {
      // check for existing seat number
      const existingSeatNumber = await bookingQueries.findSeatNumber(seatnumber);
      if (existingSeatNumber.length) {
      return res.status(400).json({
            error: 'seat number has been taken'
         });
      }

      // check for bus seat limit
      const seatLimit = await busQueries.getSeatLimit(busid);
      const limit = seatLimit[0].max_seat;

      if (limit != 0 && limit != undefined && seatnumber > limit) {
         return res.status(400).json({
            error: `seat number is above max limit. Please select a seat number not greater than ${limit}`
         });
      }

      // validate bus ID
      const bus = await busQueries.findID(busid);
      if (!bus.length) {
         return res.json({ error: 'Bus not found, make sure a bus is available' });
      }

      // validate trip ID
      const trip = await tripQueries.getTripById(tripid);
      if (!trip.length) {
         return res.json({ error: 'Trip not found, make sure a trip is available' });
      }

      // validate trip status
      const tripStatus = await tripQueries.getCancledTripById(tripid);
      if (tripStatus.length) {
         return res.json({ error: 'Trip cancled out of trip list' });
      }

      const newBooking = await bookingQueries.createBookings(
         user_id,
         tripid,
         busid,
         seatnumber,
         firstname,
         lastname,
         email
      );

      return res.status(201).json({
         status: 'success',
         message: 'booking was successfully created',
         data: newBooking
      });
   } catch (error) {
      return res.status(500).json({
         status: 'error',
         error: 'oops! something went wrong went wrong'
      });
   }
};


// @route    DELETE api/bookings
// @desc     delete trip by ID
// @access   Private
bookingController.deleteBookingById = async (req, res) => {
   const { bookingId } = req.params;
   try {
      const booking = await bookingQueries.getBookingById(bookingId);

      if (!booking.length) {
         return res.json({ error: 'This booking is not available' });
      }
      const deleteBooking = await bookingQueries.deleteBookingById(bookingId);

      if (!deleteBooking) {
         return res.json({ error: 'Opps! failed to delete booking, try again' });
      }
      return res.status(200).json({
         status: 'success',
         message: 'booking was successfully deleted',
         data: booking
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
bookingController.userSeatUpdate = async (req, res) => {
    const { user_id, seatnumber } = req.body;
    const booking_id = req.params.bookingId;

    try {
      // check if seat is available
      const existingSeatNumber = await bookingQueries.findSeatNumber(seatnumber);
      if (existingSeatNumber.length) {
      return res.status(400).json({
            error: 'seat number has been taken'
         });
      }

      const booking = await bookingQueries.getBookingById(booking_id);

      if (!booking.length) {
         return res.json({ error: 'This booking is not available' });
      }

      // check for bus seat limit
      const seatLimit = await busQueries.getSeatLimit(booking[0].bus_id);
      const limit = seatLimit[0].max_seat;

      if (limit != 0 && limit != undefined && seatnumber > limit) {
         return res.status(400).json({
            error: `seat number is above max limit. Please select a seat number not greater than ${limit}`
         });
      }

      const updatedSeatNumber = await bookingQueries.seatUpdate(booking_id, seatnumber);
      if (!updatedSeatNumber.length) {
         return res.json({ error: 'Failed to update seat number' });
      }

      res.status(200).json({
            status: 'success',
            data: updatedSeatNumber
      });
    } catch (error) {
         return res.status(500).json({ error: 'oops! something went wrong' });
    }
};


export default bookingController;
