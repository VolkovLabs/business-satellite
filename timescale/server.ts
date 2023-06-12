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

let temp = 20;
let temp2 = 20;

const addMetrics = async () => {
  temp += Math.random();
  temp2 += Math.random();

  await client.query(`insert into metrics values(nextval('seq_metrics'), now(), 'device1', ${temp});`);
  await client.query(`insert into metrics values(nextval('seq_metrics'), now(), 'device2', ${temp2});`);

  let timeout = 1000;
  if (temp > 100 || temp2 > 100) {
    temp = 20;
    temp2 = 20;

    await client.query(`insert into controls values(nextval('seq_controls'), now(), 'device1', ${temp});`);
    await client.query(`insert into controls values(nextval('seq_controls'), now(), 'device2', ${temp2});`);

    timeout = 5000;
  }

  setTimeout(addMetrics, timeout);
};

/**
 * Update the database
 */
setTimeout(addMetrics, 1000);
