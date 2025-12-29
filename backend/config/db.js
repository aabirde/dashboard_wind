require('pg'); 
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.SUPABASE_DB_NAME,
  process.env.SUPABASE_DB_USER,
  process.env.SUPABASE_DB_PASSWORD,
  {
    host: process.env.SUPABASE_DB_HOST,
    dialect: 'postgres', 
    port: process.env.SUPABASE_DB_PORT || 5432,
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    pool: {
      max: 100,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Supabase database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the Supabase database:', error);
 //  temp comment process.exit(1);
  }
};

module.exports = {
  sequelize,
  connectDB
};