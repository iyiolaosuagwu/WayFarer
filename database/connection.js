import { Client } from 'pg';
import dotenv from 'dotenv';
import { DB_CONFIG } from '../config';

dotenv.config();
// const { env } = process;

const client = new Client(DB_CONFIG);

export default client;
