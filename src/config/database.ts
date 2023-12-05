import { Pool } from 'pg';

export default new Pool({
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  connectionString: process.env.DATABASE_URL,
});
