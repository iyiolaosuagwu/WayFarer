import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { APP_PORT } from './config';

// Routes
import user from './routes/user';
import booking from './routes/booking';
import trip from './routes/trip';
import bus from './routes/bus';

dotenv.config();

const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


// use route
app.use('/api/', user);
app.use('/api/', booking);
app.use('/api/', trip);
app.use('/api/', bus);

app.use(morgan('dev'));

const PORT = process.env.PORT || APP_PORT;
app.listen(PORT, () => console.log(`App started on port ${PORT}`));
