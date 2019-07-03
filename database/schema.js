import connection from './connection';

// connect db
connection.connect()
.then(() => console.log('Postgres Connected'))
.catch(error => console.log(error, 'look here'));

const usersTable = `
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(254) NOT NULL,
    password VARCHAR(150) NOT NULL,
    is_admin BOOLEAN DEFAULT false
);
`;

const busTable = `
DROP TABLE IF EXISTS bus CASCADE;
CREATE TABLE bus (
    id SERIAL PRIMARY KEY,
    number_plate VARCHAR(50) NOT NULL,
    manufacturer VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    year VARCHAR(50) NOT NULL,
    capacity INTEGER NOT NULL
);
`;


const tripTable = `
DROP TABLE IF EXISTS trip CASCADE;
CREATE TABLE trip (
    id SERIAL PRIMARY KEY,
    bus_id INTEGER REFERENCES bus(id) ON DELETE CASCADE NOT NULL,
    origin VARCHAR(50) NOT NULL,
    destination VARCHAR(50) NOT NULL,
    trip_date DATE DEFAULT NOW(),
    fare BOOLEAN DEFAULT false,
    status BOOLEAN DEFAULT false
);
`;


const bookingTable = `
DROP TABLE IF EXISTS booking CASCADE;
CREATE TABLE booking (
    id SERIAL PRIMARY KEY,
    trip_id INTEGER REFERENCES trip(id) ON DELETE CASCADE NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    created_on DATE DEFAULT NOW()
);
`;

const queryString = `
    ${usersTable}
    ${busTable}
    ${tripTable}
    ${bookingTable}
`;


(async () => {
    try {
        await connection.query(queryString);
        connection.end();
    } catch (error) {
        /* eslint-disable-next-line */
        if (error) console.log(error);
        connection.end();
    }
})();
