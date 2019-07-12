import faker from 'faker';

const SIZE = 1;

const users = [];
const bus = [];
const trips = [];
const bookings = [];


for (let i = 0; SIZE > i; i++) {
    users.push({
        first_name: faker.name.firstName(),
        last_name: faker.name.firstName(),
        email: faker.internet.email(),
        password: '12345'
    });
}


for (let i = 0; SIZE > i; i++) {
    bus.push({
        owner: 1,
        number_plate: '12',
        manufacturer: 'Toyota',
        model: '2017',
        year: new Date().getFullYear(),
        capacity: 1000
    });
}


for (let i = 0; SIZE > i; i++) {
    trips.push({
        owner: 2,
        bus_id: 1,
        origin: 'kogi',
        destination: 'lagos',
        fare: 5000
    });
}


for (let i = 0; SIZE > i; i++) {
    bookings.push({
        trip_id: 1,
        user_id: 2,
        seat_number: 1
    });
}


export {
    users,
    bus,
    trips,
    bookings
};
