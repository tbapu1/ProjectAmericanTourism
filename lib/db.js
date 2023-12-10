const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost', // e.g., localhost
  database: 'ProjectAmericanTourism',
  password: 'password',
  port: 5432, // PostgreSQL default port
});

module.exports = pool;
