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
    (last_name, first_name, email, password)
    VALUES ${userValues}
;`;

// Bus seeder
const busValues = getValues(bus);
const busSeeder = `
    INSERT INTO bus
    (user_id, number_plate, manufacturer, model, year, capacity, max_seat)
    VALUES ${busValues}
;`;

// Trip seeder
const tripValues = getValues(trips);
const tripSeeder = `
    INSERT INTO trips
    (user_id, bus_id, origin, destination, fare)
    VALUES ${tripValues}
;`;

// Booking seeder
const bookingValues = getValues(bookings);
const bookingSeeder = `
    INSERT INTO bookings
    (user_id, trip_id, bus_id, seat_number, first_name, last_name, email)
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
