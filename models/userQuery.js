import connection from '../database/connection';


// connect db
connection.connect()
.then(() => console.log('Postgres Connected'))
.catch(error => console.log(error, 'look here'));

 export const userQueries = {
    async findAllUser() {
        const query = 'SELECT * FROM users;';
        const { rows } = await connection.query(query);
        return rows;
    },

    async findUserByEmail(email) {
        const queryString = {
            query: `SELECT * FROM users WHERE email=${email}';`
        };

        const { rows } = await connection.query(query);
        return rows;
    },


    async findUserById(id) {
        const queryString = {
            text: 'SELECT * FROM users WHERE id=$1;',
            values: [id]
        };

        const { rows } = await connection.query(queryString);
        return rows[0];
    },

    async createUser(firstName, lastName, email, password) {
        const queryString = {
            text: `INSERT INTO users
                (first_name, last_name, email, password)
                VALUES($1, $2, $3, $4)
                RETURNING id, first_name, last_name, email;`,
            values: [firstName, lastName, email, password]
        };

        const { rows } = await connection.query(queryString);
        return rows[0];
    },
};


export default userQueries;
