import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import user from './routes/user';
import { APP_PORT } from './config';
import booking from './routes/booking';
import trips from './routes/trips';
import bus from './routes/bus';

const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


// use route
app.use('/api/', user);
app.use('/api/', booking);
app.use('/api/', trips);
app.use('/api/', bus);

app.use(morgan('dev'));

const PORT = process.env.PORT || APP_PORT;
app.listen(PORT, () => console.log(`App started on port ${PORT}`));
