import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;
const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // This tells your client not to validate the SSL certificate (suitable for many cloud providers)
  },
});

export default db;
