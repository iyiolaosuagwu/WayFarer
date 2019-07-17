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
        user_id: 1,
        number_plate: '12',
        manufacturer: 'Toyota',
        model: '2017',
        year: new Date().getFullYear(),
        capacity: 1000,
        max_seat: 30

    });
}


for (let i = 0; SIZE > i; i++) {
    trips.push({
        user_id: 2,
        bus_id: 1,
        origin: 'kogi',
        destination: 'lagos',
        fare: 5000
    });
}


for (let i = 0; SIZE > i; i++) {
    bookings.push({
        user_id: 2,
        trip_id: 1,
        bus_id: 2,
        seat_number: 1,
        first_name: faker.name.firstName(),
        last_name: faker.name.firstName(),
        email: faker.internet.email()
    });
}


export {
    users,
    bus,
    trips,
    bookings
};
