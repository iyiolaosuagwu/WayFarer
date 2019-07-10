import connection from '../database/connection';

const bookingQueries = {
    async findAllBookings() {
        const queryString = 'SELECT * FROM bookings;';
        const { rows } = await connection.query(queryString);
        return rows;
    },

    async createBookings(bookingId, tripId, userId, seatNumber, firstName, lastName, email) {
        const queryString = {
            text: `INSERT INTO bookings
            (id, trip_id, user_id, seat_number, first_name, last_name, email)
            VALUES($1, $2, $3, $4, $5, $6, $7)
            RETURNING *;`,
            values: [bookingId, tripId, userId, seatNumber, firstName, lastName, email]
        };

        const { rows } = await connection.query(queryString);
        return rows[0];
    },

    async findBookingsById(id) {
        const queryString = {
            text: 'SELECT * FROM bookings WHERE id=$1;',
            values: [id]
        };
        const { rows } = await connection.query(queryString);
        return rows[0];
    },


    async deleteBookingsId(bookingId) {
        const queryString = {
            text: 'DELETE FROM bookings WHERE booking_id=$1;',
            values: [bookingId]
        };
        await connection.query(queryString);
    }
};


export default bookingQueries;
