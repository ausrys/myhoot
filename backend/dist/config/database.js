import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();
const isTest = process.env.NODE_ENV === 'test';
const sequelize = new Sequelize({
    dialect: isTest ? 'sqlite' : 'postgres',
    storage: isTest ? ':memory:' : undefined,
    database: isTest ? undefined : process.env.DB_NAME,
    username: isTest ? undefined : process.env.DB_USER,
    password: isTest ? undefined : process.env.DB_PASSWORD,
    host: isTest ? undefined : process.env.DB_HOST,
    logging: false,
});
export default sequelize;
