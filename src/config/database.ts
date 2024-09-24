// src/config/database.ts

import { Sequelize } from 'sequelize';

// Define the database connection
const sequelize = new Sequelize('faq_db', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql', // or whatever database you're using (e.g., 'postgres', 'sqlite', 'mssql')
});

export default sequelize;
