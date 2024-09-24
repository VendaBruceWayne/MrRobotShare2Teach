 
import { Sequelize } from 'sequelize-typescript';
import { Faq } from '../models/Faq'; // Adjust the path as needed
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
    database: process.env.DB_DATABASE,      // Use the environment variable
    dialect: 'mysql',                    // Change to your database dialect if necessary
    username: process.env.DB_USER,      // Use the environment variable
    password: process.env.DB_PASSWORD,  // Use the environment variable
    host: 'localhost',                   // Ensure the host is correct
    models: [Faq],                       // Add your models here
});
export default sequelize;

// Rest of your application code...


