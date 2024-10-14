import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const { DB_USER_NAME, DB_PASSWORD, DB_NAME, DB_HOST, DB_POST } = process.env;

const dbConfig = {
  user: DB_USER_NAME,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: DB_POST, // Default PostgreSQL port
};

export default dbConfig;
