import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import user from './routes/user';

dotenv.config();
// const { env } = process;


const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const PORT = process.env.PORT || process.env.APP_PORT;

// use route
app.use('/api/user', user);

app.listen(PORT, () => console.log(`App started on port ${PORT}`));
