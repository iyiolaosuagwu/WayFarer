import connection from '../database/connection';

const bookingQueries = {
    async getAllBookings() {
        const queryString = 'SELECT * FROM bookings;';
        const { rows } = await connection.query(queryString);
        return rows;
    },

    async createBookings(owner, tripid, busid, seatnumber, firstname, lastname, email) {
        const queryString = {
            text: `INSERT INTO bookings
            (owner, trip_id, bus_id, seat_number, first_name, last_name, email)
            VALUES($1, $2, $3, $4, $5, $6, $7)
            RETURNING id, owner, trip_id, bus_id, trip_date, seat_number, first_name, last_name, email;`,
            values: [owner, tripid, busid, seatnumber, firstname, lastname, email]
        };

        const { rows } = await connection.query(queryString);
        return rows[0];
    },

    async getAllUserBookings(userid) {
      const query = `SELECT * FROM bookings WHERE owner='${userid}';`;

      const { rows } = await connection.query(query);
      return rows;
   },


   async getBookingById(bookingId) {
      const query = `SELECT * FROM bookings WHERE id='${bookingId}';`;

      const { rows } = await connection.query(query);
      return rows;
   },


    async findSeatNumber(seatId) {
        const queryString = {
            text: 'SELECT * FROM bookings WHERE seat_number=$1;',
            values: [seatId]
        };
        const { rows } = await connection.query(queryString);
        return rows[0];
    },


    async deleteBookingById(bookingId) {        
        const query = `DELETE FROM bookings WHERE id='${bookingId}';`;
            
        const { rows } = await connection.query(query);
        return rows;
    },


    async seatUpdate(id, status) {
      const queryString = {
         text: 'UPDATE bookings SET seat_number=$2 WHERE id=$1;',
         values: [id, status]
      };

      const { rows } = await connection.query(queryString);
      return rows[0];
   },


};


export default bookingQueries;
