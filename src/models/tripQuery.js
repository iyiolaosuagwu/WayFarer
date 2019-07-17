import connection from '../database/connection';

const tripQueries = {

   async getAllTrips() {
      const query = 'SELECT * FROM trips';
      const { rows } = await connection.query(query);
      return rows;
   },

   async getTripById(tripId) {
      
      const query = `SELECT * FROM trips WHERE id='${tripId}';`;

      const { rows } = await connection.query(query);
      return rows;
   },

   async getCancledTripById(tripId) {
      const query = `SELECT * FROM trips WHERE id='${tripId}' AND status=false;`;

      const { rows } = await connection.query(query);
      return rows;
   },

   async updateTripById(id) {
      const query = `UPDATE trips SET status=false WHERE id='${id}';`;

      const { rows } = await connection.query(query);
      return rows;
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

   async createTrips(user_id, busId, origin, destination, fare) {
      const queryString = {
         text: `INSERT INTO trips
         (user_id, bus_id, origin, destination, fare)
         VALUES($1, $2, $3, $4, $5)
         RETURNING id, user_id, bus_id, origin, destination, trip_date, fare, status;`,
         values: [user_id, busId, origin, destination, fare]
      };

      const { rows } = await connection.query(queryString);
      return rows[0];
   },

};


export default tripQueries;
