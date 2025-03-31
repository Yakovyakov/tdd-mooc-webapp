const { Pool } = require('pg');


const connectionString = process.env.DATABASE_URL || 'postgresql://127.0.0.1:5432/webapp?user=webapp&password=secret'

const pool = new Pool({connectionString});

const checkConnection = async () => {
  try {
    await pool.query('SELECT NOW()');
    return true;
  } catch (err) {
    console.error('Database connection failed:', err);
    return false;
  }
};

module.exports = {
  pool,
  checkConnection
};