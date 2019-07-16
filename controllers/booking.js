import bookingQueries from '../models/bookingQuery';
import userQueries from '../models/userQuery';
import tripQueries from '../models/tripQuery';
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

      if (!booking) {
         return res.json({ msg: 'Bookings not found' });
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
         return res.json({ msg: 'No booking available' });
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
         return res.json({ msg: 'This booking is not available' });
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
      const existingSeatNumber = await bookingQueries.findSeatNumber(seatnumber);
      if (existingSeatNumber) {
      return res.status(400).json({
            error: 'seat number has been taken'
         });
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

      const payload = {
         id: newBooking.id,
         owner: req.body.user_id,
         trip_id: newBooking.tripid,
         bus_id: newBooking.busid,
         trip_date: newBooking.trip_date,
         seat_number: newBooking.seatnumber,
         first_name: newBooking.first_name,
         last_name: newBooking.last_name,
         email: newBooking.email,
      };

      return res.status(201).json({
         status: 'success',
         message: 'booking was successfully created',
         data: payload
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
         return res.json({ msg: 'This booking is not available' });
      }
      const deleteBooking = await bookingQueries.deleteBookingById(bookingId);

      if(!deleteBooking){
         return res.json({ msg: 'Opps! failed to delete booking, try again' });
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



export default bookingController;
