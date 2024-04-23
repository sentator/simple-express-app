import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  host: 'postgres',
  user: 'postgres',
  port: 5432,
  password: 'L1953TR',
  database: 'users_express',
});

export default pool;
