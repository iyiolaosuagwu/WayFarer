import bookingQueries from '../models/bookingQuery';

const bookingController = {};

bookingController.getAllBooking = async (req, res) => {
   try {
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
         data: []
      });
   }
};

export default bookingController;
