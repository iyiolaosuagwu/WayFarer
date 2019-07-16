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

    async createNewBus(owner, numberPlate, manufacturer, model, year, capacity) {
        const queryString = {
            text: `INSERT INTO bus
                (owner, number_plate, manufacturer, model, year, capacity)
                VALUES($1, $2, $3, $4, $5, $6)
                RETURNING id, owner, number_plate, manufacturer, model, year, capacity;`,
            values: [owner, numberPlate, manufacturer, model, year, capacity]
        };

        const { rows } = await connection.query(queryString);
        return rows[0];
    },
};

export default busQueries;
