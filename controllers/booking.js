import bookingQueries from '../models/bookingQuery';
import { userQueries } from '../models/userQuery';

const bookingController = {};


bookingController.createBooking = async (req, res) => {
   const {
      bookingId, tripId, userId, seatNumber, firstName, lastName, email
   } = req.body;
   try {
      const User = await userQueries.findUserById(userId);

      if (!User) {
         return res.json({ msg: 'Bookings does not exist' });
      }
      const newBooking = await bookingQueries.createBookings(
         bookingId,
         tripId,
         userId,
         seatNumber,
         firstName,
         lastName,
         email
      );
      return res.status(201).json({
         status: 'success',
         message: 'booking was successfully created',
         data: newBooking
      });
   } catch (error) {
      res.status(500).json({
      status: 'error',
      error: 'Internal server error'
   });
   }
};


bookingController.getAllBooking = async (req, res) => {
   const { is_admin } = req.body;
   try {
      if (!is_admin) {
         return res.json({ error: 'only admin can view this books' });
      }

      console.log(req.body);

      const booking = await bookingQueries.findAllBookings();

      if (!booking) {
         return res.json({ msg: 'Bookings not found' });
      }

      return res.status(200).json({
         status: 'success',
         data: booking
      });
   } catch (error) {
      return res.status(400).json({
         status: 'error',
         error: 'Internal server error'
      });
   }
};


bookingController.deleteBookingById = async (req, res) => {
   const { bookingId } = req.params;
   try {
      const book = await bookingQueries.findBookingsById(bookingId);
      if (book !== req.body.user_id) {
         return res.status(401).json({ error: 'User not authorized' });
      }

      await bookingQueries.deleteBookingsId(book);
         return res.status(200).json({
            status: 'success',
            message: 'booking was successfully deleted'
         });
   } catch (error) {
      return res.status(400).json({
         status: 'error',
         error: 'Internal server error'
      });
   }
};


export default bookingController;
