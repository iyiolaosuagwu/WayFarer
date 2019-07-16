import connection from '../database/connection';

const tripQueries = {

   async getAllTrips() {
      const queryString = 'SELECT * FROM trips';
      const { rows } = await connection.query(queryString);
      return rows;
   },


   async getTrupById(tripId) {
      const queryString = {
         text: 'SELECT * FROM trips WHERE id=$1;',
         values: [tripId]
      };

      const { rows } = await connection.query(queryString);
      return rows[0];
   },

   async updateTripById(id, status) {
      const queryString = {
         text: 'UPDATE trips SET status=$2 WHERE id=$1;',
         values: [id, status]
      };

      const { rows } = await connection.query(queryString);
      return rows[0];
   },

   async getTripsByOrigin(searchQuery) {
      const query = `SELECT * FROM trips WHERE origin LIKE '%${searchQuery}%';`;

      const { rows } = await connection.query(query);
      return rows;
   },

   async getTripsByDestination(searchQuery) {
      const query = `SELECT * FROM trips WHERE destination LIKE '%${searchQuery}%'`;

      const { rows } = await connection.query(query);
      return rows;
   },

   async createTrips(owner, busId, origin, destination, fare) {
      const queryString = {
         text: `INSERT INTO trips
         (owner, bus_id, origin, destination, fare)
         VALUES($1, $2, $3, $4, $5)
         RETURNING id, owner, bus_id, origin, destination, trip_date, fare, status;`,
         values: [owner, busId, origin, destination, fare]
      };

      const { rows } = await connection.query(queryString);
      return rows[0];
   },

};


export default tripQueries;
