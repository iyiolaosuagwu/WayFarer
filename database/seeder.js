import connection from './connection';
import {
 users, bus, trips, bookings
} from './faker/seeder';
import getValues from '../helpers/sqlValuesGetter';

// connect db
connection.connect()
.then(() => console.log('Postgres Connected'))
.catch(error => console.log(error, 'look here'));

// User seeder
const userValues = getValues(users);
const userSeeder = `
    INSERT INTO users
    (first_name, last_name, email, password, is_admin)
    VALUES ${userValues}
;`;

// Bus seeder
const busValues = getValues(bus);
const busSeeder = `
    INSERT INTO bus
    (number_plate, manufacturer, model, year, capacity)
    VALUES ${busValues}
;`;

// Trip seeder
const tripValues = getValues(trips);
const tripSeeder = `
    INSERT INTO trips
    (bus_id, origin, destination)
    VALUES ${tripValues}
;`;

// Booking seeder
const bookingValues = getValues(bookings);
const bookingSeeder = `
    INSERT INTO bookings
    (trip_id, user_id, seat_number)
    VALUES ${bookingValues}
;`;

const queryString = `
    ${userSeeder}
    ${busSeeder}
    ${tripSeeder}
    ${bookingSeeder}
`;


(async () => {
    try {
        await connection.query(queryString);
        connection.end();
    } catch (error) {
        /* eslint-disable-next-line */
        console.error(error);
        connection.end();
    }
})();
