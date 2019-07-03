import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const { env } = process;

const client = new Client({
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USERNAME,
    database: env.DB_NAME,
    password: env.DB_PASSWORD,
});

export default client;
