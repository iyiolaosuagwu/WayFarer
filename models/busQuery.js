import connection from '../database/connection';

 export const busQueries = {


    async findPlateNumber(numberPlate) {
        const queryString = {
            text: 'SELECT * FROM bus WHERE number_plate=$1;',
            values: [numberPlate]
        };

        const { rows } = await connection.query(queryString);
        return rows[0];
    },

    async createNewBus(numberPlate, manufacturer, model, year, capacity) {
        const queryString = {
            text: `INSERT INTO bus
                (number_plate, manufacturer, model, year, capacity)
                VALUES($1, $2, $3, $4, $5)
                RETURNING id, number_plate, manufacturer, model, year, capacity;`,
            values: [numberPlate, manufacturer, model, year, capacity]
        };

        const { rows } = await connection.query(queryString);
        return rows[0];
    },
};

export default busQueries;
