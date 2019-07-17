import path from 'path';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { APP_PORT } from './src/config';

// Routes
import user from './src/routes/user';
import booking from './src/routes/booking';
import trip from './src/routes/trip';
import bus from './src/routes/bus';

dotenv.config();

const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// use route
app.get('/', (req, res) => {
    res.status(200)
    .sendFile(path.resolve('documentation.html'));
});

app.use('/api/', user);
app.use('/api/', booking);
app.use('/api/', trip);
app.use('/api/', bus);

app.use(morgan('dev'));

const PORT = process.env.PORT || APP_PORT;
app.listen(PORT, () => console.log(`App started on port ${PORT}`));
