import connection from '../database/connection';

// connect db
// connection.connect()
// .then(() => console.log('Postgres Connected'))
// .catch(error => console.log(error, 'look here'));


const busQueries = {
    async findAllBuss() {
        const queryString = 'SELECT * FROM booking;';
        const { rows } = await connection.query(queryString);
        return rows;
    },

    async findBusById(Id) {
        const queryString = {
            text: 'SELECT * FROM bus WHERE id=$1;',
            values: [Id]
        };

        const { rows } = await connection.query(queryString);
        return rows[0];
    },
};


export default busQueries;
