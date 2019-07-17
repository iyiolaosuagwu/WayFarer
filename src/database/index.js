import '@babel/polyfill';
import bcrypt from 'bcrypt';
import connection from './connection';

// connect db
connection.connect()
.then(() => console.log('Postgres Connected'))
.catch(error => console.log(error, 'look here'));


const Migration = {



    async migrate() {
        try {
            console.log('Dropping users table');
            await connection.query('DROP TABLE IF EXISTS users CASCADE');
            
            console.log('Dropping bus table');
            await connection.query('DROP TABLE IF EXISTS buses CASCADE');
            
            console.log('Dropping trip table');
            await connection.query('DROP TABLE IF EXISTS trips CASCADE');
            
            console.log('Dropping booking table');
            await connection.query('DROP TABLE IF EXISTS bookings CASCADE');
            
            console.log('Creating User table');
            await connection.query(`
                CREATE TABLE IF NOT EXISTS users(
                    id SERIAL PRIMARY KEY,
                    first_name VARCHAR(100) NOT NULL,
                    last_name VARCHAR(100) NOT NULL,
                    email VARCHAR(100) NOT NULL,
                    password VARCHAR(100) NOT NULL,
                    is_admin BOOLEAN DEFAULT false
                    );
                `);
            
            console.log('Creating bus table');
            await connection.query(`
                           CREATE TABLE IF NOT EXISTS bus(
                            id SERIAL PRIMARY KEY,
                            user_id INTEGER NOT NULL,
                            number_plate VARCHAR(128) NOT NULL,
                            manufacturer VARCHAR(128) NOT NULL,
                            model VARCHAR(128) NOT NULL,
                            year INTEGER NOT NULL,
                            capacity INTEGER NOT NULL,
                            max_seat INTEGER NOT NULL,
                            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
                            );
                           `);
            
            console.log('Creating trip table');
            await connection.query(`
                           CREATE TABLE IF NOT EXISTS trips(
                            id SERIAL PRIMARY KEY,
                            user_id INTEGER NOT NULL,
                            bus_id INTEGER NOT NULL,
                            origin VARCHAR(128) NOT NULL,
                            destination VARCHAR(128) NOT NULL,
                            trip_date DATE DEFAULT NOW(),
                            fare NUMERIC(10, 2) NOT NULL,
                            status BOOLEAN DEFAULT false,
                            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                            FOREIGN KEY (bus_id) REFERENCES bus(id) ON DELETE CASCADE
                            );
                           `);
            
            console.log('Creating booking table');
            await connection.query(`
                           CREATE TABLE IF NOT EXISTS bookings(
                            id SERIAL PRIMARY KEY,
                            user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
                            trip_id INTEGER NOT NULL,
                            bus_id INTEGER NOT NULL,
                            trip_date DATE DEFAULT NOW(),
                            seat_number INTEGER NOT NULL,
                            first_name VARCHAR(100) NOT NULL,
                            last_name VARCHAR(100) NOT NULL,
                            email VARCHAR(100) NOT NULL,
                            created_on DATE NOT NULL DEFAULT CURRENT_DATE,
                            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                            FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE,
                            FOREIGN KEY (bus_id) REFERENCES bus(id) ON DELETE CASCADE
                                                               );
                           `);
            
            const adminQuery = `INSERT INTO
                users(first_name, last_name, email, password, is_admin)
                VALUES($1,$2,$3,$4,$5)
                RETURNING  first_name, last_name, email, is_admin`;
            const values = [
                'admin@gmail.com',
                'admin',
                'super',
                await bcrypt.hash('password', 10),
                true,
            ];

            console.log('Creating Admin');
            await connection.query(adminQuery, values);
            connection.end();
            
        } catch (error) {
            connection.end();
            console.log(error);
        }
    },
};

export default Migration;

Migration.migrate();
