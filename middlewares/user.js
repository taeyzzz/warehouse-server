const bcrypt = require('bcrypt');
const moment = require('moment')
const jwt = require('jsonwebtoken');
const db = require('../db')

exports.login = async (req, res, next) => {
  const { email, password } = req.body
  const client = await db.connect()
  const queryText = `SELECT id, password, email, firstname, lastname, tel FROM users WHERE email = $1`
  try {
    const result = await client.query(queryText, [email])
    const same = await bcrypt.compare(password, result.rows[0].password)
    if(!same){
      throw new Error('Unauthorized')
    }
    req.currentUserData = Object.assign({}, result.rows[0], {
      password: undefined
    })
    next()
  }
  catch (err) {
    console.log(err);
    err.httpStatusCode = 401
    next(err)
  }
  finally{
    client.release()
  }
}

exports.endLogin = async (req, res, next) => {
  const userData = req.currentUserData
  res.cookie('token', req.signedToken, { expires: new Date(Date.now() + 60*1000), httpOnly: true });
  res.json(userData)
}

exports.register = async (req, res, next) => {
  const {
    email, password, firstname, lastname, tel
  } = req.body
  const client = await db.connect()
  const queryText = `
    INSERT into
    users (email, password, firstname, lastname, tel, created_date, modified_date)
    VALUES($1, $2, $3, $4, $5, $6, $7)
  `;
  try {
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS)
    const salt = await bcrypt.genSalt(saltRounds)
    const hash = await bcrypt.hash(password, salt)
    const result = await client.query(queryText, [email, hash, firstname, lastname, tel, moment().toDate(), moment().toDate()])
    next()
  }
  catch (err) {
    console.log(err);
    err.httpStatusCode = 400
    next(err)
  }
  finally{
    client.release()
  }
}

exports.generateToken = async (req, res, next) => {
  const data = { id: req.currentUserData.id }
  const token = jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: "60s"
  });
  req.signedToken = token
  next()
}

exports.endRegister = async (req, res, next) => {
  res.json({
    msg: "Register User Success"
  })
}

exports.getUserInfo = async (req, res, next) => {
  const { token } = req.cookies
  const client = await db.connect()
  const queryText = `SELECT id, email, firstname, lastname, tel FROM users WHERE id = $1`
  try {
    const data = await jwt.verify(token, process.env.JWT_SECRET)
    const result = await client.query(queryText, [data.id])
    req.currentUserData = result.rows[0]
    next()
  }
  catch (err) {
    console.log(err);
    next(err)
  }
}
