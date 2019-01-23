const { Pool } = require('pg');

const createDatabase = () => {
  const pool = new Pool({
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    database: 'postgres',
    port: 5432,
  })
  return new Promise((resolve, reject) => {
    pool.connect((err, client, done) => {
      if (err) throw err
      client.query('CREATE DATABASE warehouse', (err, res) => {
        if(res){
          console.log(res);
        }
        if(err && err.code === "42P04"){
          console.log("Database already exist");
        }
        else{
          console.log(err);
        }
        done()
        resolve()
      })
    })
  });
}

const createTables = () => {
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

  return new Promise((resolve, reject) => {
    pool.connect((err, client, done) => {
      if (err) throw err
      client.query(queryText)
        .then((res) => {
          console.log(res);
          console.log('done');
          done()
          resolve()
        })
        .catch((err) => {
          console.log(err);
          console.log('err');
          done()
          resolve()
        })
    })
  });
}

const add = () => {
  const pool = new Pool({
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    database: 'warehouse',
    port: 5432,
  })
  const queryText =
    `INSERT INTO
    users(email, password)
    VALUES($1, $2)`;
  return new Promise((resolve, reject) => {
    pool.connect((err, client, done) => {
      if (err) throw err
      client.query(queryText, ["aaa@gmail.com", 123456])
        .then((res) => {
          console.log(res);
          console.log('done');
          done()
          resolve()
        })
        .catch((err) => {
          console.log(err);
          console.log('err');
          done()
          resolve()
        })
    })
  });
}

const setupDatabase = async () => {
  await createDatabase()
  await createTables()
  await add()
}

setupDatabase()
