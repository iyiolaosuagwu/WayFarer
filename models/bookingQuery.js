import connection from '../database/connection';

// connect db
connection.connect()
.then(() => console.log('Postgres Connected'))
.catch(error => console.log(error, 'look here'));


const bookingQueries = {
    async findAllBookings() {
        const queryString = 'SELECT * FROM booking;';
        const { rows } = await connection.query(queryString);
        return rows;
    },
};


export default bookingQueries;
