const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.get("/information", (req, res, next) => {
  const { token } = req.cookies
  var decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decoded);
  res.json(decoded)
})

router.post("/register", (req, res, next) => {
  const email = req.body.email
  const password = req.body.password
  const data = {
    email,
    password
  }
  var token = jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: "60s"
  });
  res.cookie('token', token, { expires: new Date(Date.now() + 60000), httpOnly: true });
  res.json({
    email: req.body.email,
    password: req.body.password
  })
})

module.exports = router
