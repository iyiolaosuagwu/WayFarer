import connection from '../database/connection';

const tripQueries = {
   async getAllTrips() {
      const queryString = 'SELECT * FROM trips';
      const { rows } = await connection.query(queryString);
      return rows;
   },

   async createTrips(owner, busId, origin, destination, fare, status) {
      const queryString = {
         text: `INSERT INTO trips
         (owner, bus_id, origin, destination, fare, status)
         VALUES($1, $2, $3, $4, $5, $6)
         RETURNING id, owner, bus_id, origin, destination, trip_date, fare, status;`,
         values: [owner, busId, origin, destination, fare, status]
      };

      const { rows } = await connection.query(queryString);
      return rows[0];
   },

};


export default tripQueries;
