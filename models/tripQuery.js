import connection from '../database/connection';

// connect db
// connection.connect()
// .then(() => console.log('Postgres Connected'))
// .catch(error => console.log(error, 'look here'));

const tripQueries = {

    async findAllTrips() {
        const queryString = 'SELECT * FROM trip;';
        const { rows } = await connection.query(queryString);
        return rows;
    },

    async createTrip(origin, destination) {
        const queryString = {
            text: `INSERT INTO trip
            ( origin, destination)
            VALUES($1, $2)
            RETURNING id, bus_id, origin, destination, trip_date, fare, status;`,
            values: [origin, destination]
        };

        const { rows } = await connection.query(queryString);
        return rows[0];
    },

    async findTripById(id) {
        const queryString = {
            text: 'SELECT * FROM trip WHERE id=$1;',
            values: [id]
        };

        const { rows } = await connection.query(queryString);
        return rows[0];
    },
};


export default tripQueries;
