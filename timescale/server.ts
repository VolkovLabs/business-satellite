const { Client } = require('pg');

/**
 * Connect to Postgres
 */
const client = new Client({
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});
client.connect();

/**
 * Update the database
 */
while (1) {
  async () => {
    await client.query('INSERT INTO sets VALUES(1, NOW(), "test", random())');
    await client.query('INSERT INTO sets VALUES(1, NOW(), "test2", random())');
  };
}
