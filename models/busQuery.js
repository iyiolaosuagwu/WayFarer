import connection from '../database/connection';

 export const busQueries = {

    async findBuses() {
        const queryString = 'SELECT * FROM bus;';
        const { rows } = await connection.query(queryString);
        return rows;
    },

    async findPlateNumber(numberPlate) {
        const queryString = {
            text: 'SELECT * FROM bus WHERE number_plate=$1;',
            values: [numberPlate]
        };

        const { rows } = await connection.query(queryString);
        return rows[0];
    },

    async findID(id) {
        const queryString = {
            text: `SELECT * FROM bus WHERE id=${id}`,
            // values: [id]
        };

        const { rows } = await connection.query(queryString);
        return rows;
    },

    async createNewBus(user_id, numberPlate, manufacturer, model, year, capacity, maxSeat) {
        const queryString = {
            text: `INSERT INTO bus
                (user_id, number_plate, manufacturer, model, year, capacity, max_seat)
                VALUES($1, $2, $3, $4, $5, $6, $7)
                RETURNING id, user_id, number_plate, manufacturer, model, year, capacity, max_seat;`,
            values: [user_id, numberPlate, manufacturer, model, year, capacity, maxSeat]
        };

        const { rows } = await connection.query(queryString);
        return rows[0];
    },

   async getSeatLimit(bus_id) {
        const queryString = {
            text: `SELECT max_seat FROM bus WHERE id='${bus_id}';`,
        };
        const { rows } = await connection.query(queryString);
        return rows;
    },
};

export default busQueries;
