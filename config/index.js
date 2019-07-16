import dotenv from 'dotenv';

dotenv.config();
const { env } = process;

export const { APP_PORT } = env;

export const DB_CONFIG = {
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USERNAME,
    database: env.DB_NAME,
    password: env.DB_PASSWORD,
};
