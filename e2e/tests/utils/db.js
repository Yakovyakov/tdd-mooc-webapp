import { Client } from 'pg';

export async function resetDB() {
  const connectionString = process.env.DATABASE_URL || 'postgresql://127.0.0.1:5432/webapp?user=webapp&password=secret'

  const client = new Client({connectionString});

  await client.connect();
  await client.query('DELETE FROM todos');
  await client.end();
}