import connection from '../database/connection';

 export const busQueries = {

    async createNewBus(busId, numberPlate, manufacturer, model, year, capacity) {
        const queryString = {
            text: `INSERT INTO bus
                (id, number_plate, manufacturer, model, year, capacity)
                VALUES($1, $2, $3, $4, $5, $6)
                RETURNING bus_id, number_plate, manufacturer, model, year, capacity;`,
            values: [busId, numberPlate, manufacturer, model, year, capacity]
        };

        const { rows } = await connection.query(queryString);
        return rows[0];
    },
};

export default busQueries;
