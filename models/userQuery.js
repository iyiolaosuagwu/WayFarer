import connection from '../database/connection';


// connect db
connection.connect()
.then(() => console.log('Postgres Connected'))
.catch(error => console.log(error, 'look here'));

 export const userQueries = {
    async findUserByEmail(userEmail) {
        const queryString = {
            text: 'SELECT * FROm users WHERE email=$1;',
            values: [userEmail]
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

    async updatePassword(userId, passwordHash) {
        const queryString = {
            text: `UPDATE users SET password_hash = $2
                WHERE id = $1; `,
            values: [userId, passwordHash]
        };
        const { rows } = await connection.query(queryString);
        return rows;
    }
};


export default userQueries;
