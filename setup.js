const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  database: 'warehouse',
  port: 5432,
})

const createDatabase = async () => {
  const poolCreateDatabase = new Pool({
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    database: 'postgres',
    port: 5432,
  })
  const client = await poolCreateDatabase.connect()
  try {
    const res = await client.query('CREATE DATABASE warehouse')
    console.log("Created Database");
  }
  catch (err) {
    if(err && err.code === "42P04"){
      console.log("Database already exist");
    }
    else{
      return Promise.reject(err)
    }
  }
  finally {
    client.release()
    return Promise.resolve()
  }
}

const createUsersTables = async () => {
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
    return Promise.reject(err)
  }
  finally {
    client.release()
    return Promise.resolve()
  }
}

const createProductsTable = async () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS
      products(
        id SERIAL PRIMARY KEY,
        sku VARCHAR(128) UNIQUE NOT NULL,
        name VARCHAR(128) NOT NULL,
        description VARCHAR(128),
        amount NUMERIC,
        price MONEY,
        created_date TIMESTAMP,
        modified_date TIMESTAMP
      )`;
  const client = await pool.connect()
  try {
    const res = await client.query(queryText)
    console.log('create Product table done');
  }
  catch (err) {
    console.log(err);
    return Promise.reject(err)
  }
  finally {
    client.release()
    return Promise.resolve()
  }
}

const createTagsTable = async () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS
      tags(
        id SERIAL PRIMARY KEY,
        name VARCHAR(128) NOT NULL,
        created_date TIMESTAMP,
        modified_date TIMESTAMP
      )`;
  const client = await pool.connect()
  try {
    const res = await client.query(queryText)
    console.log('create Tag table done');
  }
  catch (err) {
    console.log(err);
    return Promise.reject(err)
  }
  finally {
    client.release()
    return Promise.resolve()
  }
}

const createProductsTagsTable = async () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS
      products_tags(
        product_id INTEGER REFERENCES products (id),
        tag_id INTEGER REFERENCES tags (id),
        created_date TIMESTAMP,
        modified_date TIMESTAMP
      )`;
  const client = await pool.connect()
  try {
    const res = await client.query(queryText)
    console.log('create Products_Tags table done');
  }
  catch (err) {
    console.log(err);
    return Promise.reject(err)
  }
  finally {
    client.release()
    return Promise.resolve()
  }
}

const createReceivesTable = async () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS
      receives(
        id SERIAL PRIMARY KEY,
        date TIMESTAMP,
        created_date TIMESTAMP,
        modified_date TIMESTAMP
      )`;
  const client = await pool.connect()
  try {
    const res = await client.query(queryText)
    console.log('create Receives table done');
  }
  catch (err) {
    console.log(err);
    return Promise.reject(err)
  }
  finally {
    client.release()
    return Promise.resolve()
  }
}

const createSalesTable = async () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS
      sales(
        id SERIAL PRIMARY KEY,
        date TIMESTAMP,
        created_date TIMESTAMP,
        modified_date TIMESTAMP
      )`;
  const client = await pool.connect()
  try {
    const res = await client.query(queryText)
    console.log('create Sales table done');
  }
  catch (err) {
    console.log(err);
    return Promise.reject(err)
  }
  finally {
    client.release()
    return Promise.resolve()
  }
}

const createReceivesProductTable = async () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS
      receives_product(
        receive_id INTEGER REFERENCES receives (id),
        product_id INTEGER REFERENCES products (id),
        amount NUMERIC,
        created_date TIMESTAMP,
        modified_date TIMESTAMP
      )`;
  const client = await pool.connect()
  try {
    const res = await client.query(queryText)
    console.log('create Receive Products table done');
  }
  catch (err) {
    console.log(err);
    return Promise.reject(err)
  }
  finally {
    client.release()
    return Promise.resolve()
  }
}

const createSalesProductsTables = async () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS
      sales_product(
        sale_id INTEGER REFERENCES sales (id),
        product_id INTEGER REFERENCES products (id),
        amount NUMERIC,
        created_date TIMESTAMP,
        modified_date TIMESTAMP
      )`;
  const client = await pool.connect()
  try {
    const res = await client.query(queryText)
    console.log('create Sales Product table done');
  }
  catch (err) {
    console.log(err);
    return Promise.reject(err)
  }
  finally {
    client.release()
    return Promise.resolve()
  }
}

const setupDatabase = async () => {
  try {
    await createDatabase()
    await createUsersTables()
    await createProductsTable()
    await createTagsTable()
    await createProductsTagsTable()
    await createReceivesTable()
    await createSalesTable()
    await createReceivesProductTable()
    await createSalesProductsTables()
  }
  catch (err) {
    console.log(err);
  }
}

setupDatabase()
