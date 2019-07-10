import connection from '../database/connection';

const tripQueries = {
   async getAllTrips() {
      const queryString = 'SELECT * FROM trips';
      const { rows } = await connection.query(queryString);
      return rows;
   },


   async createTrip(tripId, userId, firstName, lastName, origin, destination, tripDate, fare) {
      const queryString = {
         text: `INSERT INTO trips
         (id, bus_id, origin, destination, trip_date, fare)
         VALUES($1, $2, $3, $4, $5, $6)
         RETURNING *;`,
         values: [tripId, userId, firstName, lastName, origin, destination, tripDate, fare]
      };

      const { rows } = await connection.query(queryString);
      return rows[0];
   },

};


export default tripQueries;
