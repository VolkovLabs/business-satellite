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

const addMetrics = async () => {
  await client.query("insert into metrics values(1, now(), 'test', random());");
  await client.query("insert into metrics values(1, now(), 'test2', random());");

  setTimeout(addMetrics, 1000);
};

/**
 * Update the database
 */
setTimeout(addMetrics, 1000);
