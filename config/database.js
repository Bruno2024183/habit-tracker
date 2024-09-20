const { Sequelize } = require('sequelize');
require('dotenv').config();  // Load environment variables from the .env file

const sequelize = new Sequelize(
  process.env.DB_NAME, // Database name
  process.env.DB_USER, // Database user
  process.env.DB_PASSWORD, // Database password
  {
    host: process.env.DB_HOST, // Database host
    port: process.env.DB_PORT, // Database port (5433 in your case)
    dialect: 'postgres', // Specify Postgres as the database
  }
);

module.exports = sequelize;