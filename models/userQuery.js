import connection from '../database/connection';

// connect db
connection.connect()
.then(() => console.log('Postgres Connected'))
.catch(error => console.log(error, 'look here'));

const userQueries = {

};


export default userQueries;
