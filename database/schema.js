import connection from './connection';

// connect db
connection.connect()
.then(() => console.log('Postgres Connected'))
.catch(error => console.log(error, 'look here'));

const usersTable = `
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    is_admin BOOLEAN DEFAULT false
);
`;

const busTable = `
DROP TABLE IF EXISTS bus CASCADE;
CREATE TABLE bus (
    id SERIAL PRIMARY KEY,
    number_plate VARCHAR(128) NOT NULL,
    manufacturer VARCHAR(128) NOT NULL,
    model VARCHAR(128) NOT NULL,
    year INTEGER NOT NULL,
    capacity INTEGER NOT NULL
);
`;


const tripTable = `
DROP TABLE IF EXISTS trips CASCADE;
CREATE TABLE trips (
    id SERIAL PRIMARY KEY,
    bus_id INTEGER REFERENCES bus(id) ON DELETE CASCADE NOT NULL,
    origin VARCHAR(128) NOT NULL,
    destination VARCHAR(128) NOT NULL,
    trip_date DATE DEFAULT NOW(),
    fare BOOLEAN DEFAULT false,
    status VARCHAR(50) DEFAULT 'active',
    crated_on DATE DEFAULT NOW()
);
`;


const bookingTable = `
DROP TABLE IF EXISTS bookings CASCADE;
CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    trip_id INTEGER REFERENCES trips(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    seat_number VARCHAR(128) NOT NULL,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
