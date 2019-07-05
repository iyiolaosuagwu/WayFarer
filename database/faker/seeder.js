import faker from 'faker';

const SIZE = 10;

const users = [];
const bus = [];
const trip = [];
const booking = [];


for (let i = 0; SIZE > i; i++) {
    users.push({
        first_name: faker.name.findName(),
        last_name: faker.name.findName(),
        email: faker.internet.email(),
        avatar: 'https://banner2.kisspng.com/20180615/rtc/kisspng-avatar-user-profile-male-logo-profile-icon-5b238cb002ed52.870627731529056432012.jpg',
        password: '12345'
    });
}


for (let i = 0; SIZE > i; i++) {
    bus.push({
        number_plate: '12QQ',
        manufacturer: 'Toyota',
        model: '2017',
        year: new Date().getFullYear(),
        capacity: 1000
    });
}


for (let i = 0; SIZE > i; i++) {
    trip.push({
        bus_id: 1,
        origin: 'kogi',
        destination: 'lagos',
    });
}


for (let i = 0; SIZE > i; i++) {
    booking.push({
        trip_id: 2,
        user_id: 3
    });
}


export {
    users,
    bus,
    trip,
    booking
};


// ///////
