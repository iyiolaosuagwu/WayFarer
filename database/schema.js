import connection from './connection';

const usersTable = `
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    is_admin BOOLEAN DEFAULT true
);
`;

const busTable = `
DROP TABLE IF EXISTS bus CASCADE;
CREATE TABLE bus (
    id SERIAL PRIMARY KEY,
    owner INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
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
    owner INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    bus_id INTEGER REFERENCES bus(id) ON DELETE CASCADE NOT NULL,
    origin VARCHAR(128) NOT NULL,
    destination VARCHAR(128) NOT NULL,
    trip_date DATE DEFAULT NOW(),
    fare NUMERIC(10, 2) NOT NULL,
    status BOOLEAN DEFAULT false
);
`;

const bookingTable = `
DROP TABLE IF EXISTS bookings CASCADE;
CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    owner INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    trip_id INTEGER REFERENCES trips(id) ON DELETE CASCADE NOT NULL,
    bus_id INTEGER REFERENCES bus(id) ON DELETE CASCADE NOT NULL,
    seat_number INTEGER NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    created_on DATE NOT NULL DEFAULT CURRENT_DATE
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
