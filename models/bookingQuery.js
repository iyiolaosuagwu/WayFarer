import connection from '../database/connection';

const bookingQueries = {
    async getAllBookings() {
        const queryString = 'SELECT * FROM bookings ORDER BY id desc;';
        const { rows } = await connection.query(queryString);
        return rows;
    },

    async createBookings(user_id, tripid, busid, seatnumber, firstname, lastname, email) {
        const queryString = {
            text: `INSERT INTO bookings
            (user_id, trip_id, bus_id, seat_number, first_name, last_name, email)
            VALUES($1, $2, $3, $4, $5, $6, $7)
            RETURNING id, user_id, trip_id, bus_id, seat_number, first_name, last_name, email;`,
            values: [user_id, tripid, busid, seatnumber, firstname, lastname, email]
        };

        const { rows } = await connection.query(queryString);
        return rows[0];
    },

    async getAllUserBookings(userid) {
      const query = `SELECT * FROM bookings WHERE user_id='${userid}';`;

      const { rows } = await connection.query(query);
      return rows;
   },


   async getBookingById(bookingId) {
       console.log(bookingId)
      const query = `SELECT * FROM bookings WHERE id='${bookingId}';`;

      const { rows } = await connection.query(query);
      return rows;
   },


    async findSeatNumber(seatId) {
        const query =  `SELECT * FROM bookings WHERE seat_number='${seatId}';`;
        
        const { rows } = await connection.query(query);
        return rows;
    },


    async deleteBookingById(bookingId) {        
        const query = `DELETE FROM bookings WHERE id='${bookingId}';`;
            
        const { rows } = await connection.query(query);
        return rows;
    },



   async seatUpdate(id, seatnumber) {
        const query = `UPDATE bookings SET seat_number='${seatnumber}' WHERE id='${id}' RETURNING *;`;
        
        const { rows } = await connection.query(query);
        return rows;
    },

  
};


export default bookingQueries;
