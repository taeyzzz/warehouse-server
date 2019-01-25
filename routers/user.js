const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../db')

const router = express.Router();

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body
  const client = await db.connect()
  try {
    const result = await client.query(`select * from users where email = $1`, [email])
    const same = await bcrypt.compare('password', result.rows[0].password)
    if(!same){
      throw new Error('password not same')
    }
    res.json({
      msg: 'login'
    })
  }
  catch (err) {
    res.status(401).json({
      msg: 'no tp ass'
    })
  }
})


router.get("/information", (req, res, next) => {
  const { token } = req.cookies
  console.log(req.cookies);
  var decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decoded);
  res.json(decoded)
})

router.post("/register", async (req, res, next) => {
  const email = req.body.email
  const password = req.body.password
  const data = {
    email,
    password
  }
  const client = await db.connect()
  try {
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS)
    const salt = await bcrypt.genSalt(saltRounds)
    const hash = await bcrypt.hash(password, salt)
    const result = await client.query(`INSERT into users (email, password) VALUES($1, $2)`, [email, hash])
    console.log(result);
    const token = jwt.sign(data, process.env.JWT_SECRET, {
      expiresIn: "120s"
    });
    res.cookie('token', token, { expires: new Date(Date.now() + 60*60*1000), httpOnly: true });
    res.json({
      email: req.body.email,
      password: req.body.password
    })
  }
  catch (err) {
    console.log(err);
  }
})

module.exports = router
