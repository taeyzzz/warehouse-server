const { Pool } = require('pg');

const createDatabase = async () => {
  const pool = new Pool({
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    database: 'postgres',
    port: 5432,
  })
  const client = await pool.connect()
  try {
    const res = await client.query('CREATE DATABASE warehouse')
    console.log(res);
  }
  catch (err) {
    if(err && err.code === "42P04"){
      console.log("Database already exist");
    }
    else{
      console.log(err);
    }
  }
  finally {
    client.release()
    return Promise.resolve()
  }
}

const createTables = async () => {
  const pool = new Pool({
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    database: 'warehouse',
    port: 5432,
  })
  const queryText =
    `CREATE TABLE IF NOT EXISTS
      users(
        id SERIAL PRIMARY KEY,
        email VARCHAR(128) UNIQUE NOT NULL,
        password VARCHAR(128) NOT NULL,
        firstname VARCHAR(128),
        lastname VARCHAR(128),
        tel VARCHAR(128),
        created_date TIMESTAMP,
        modified_date TIMESTAMP
      )`;
  const client = await pool.connect()
  try {
    const res = await client.query(queryText)
    console.log('create user table done');
  }
  catch (err) {
    console.log(err);
  }
  finally {
    client.release()
    return Promise.resolve()
  }
}

const setupDatabase = async () => {
  await createDatabase()
  await createTables()
}

setupDatabase()
