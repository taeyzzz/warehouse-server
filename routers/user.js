const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Validator = require("../utils/validator")
const db = require('../db')
const middlewares = require("../middlewares")

const router = express.Router();

router.post("/login",
  Validator({
    email: { type: "string", isRequired: true },
    password: { type: "string", isRequired: true },
  }),
  middlewares.user.login,
  middlewares.user.generateToken,
  middlewares.user.endLogin
)


router.get("/info",
  middlewares.user.getUserInfo,
  middlewares.user.endLogin
)

router.post("/register",
  Validator({
    email: { type: "string", isRequired: true },
    password: { type: "string", isRequired: true },
    firstname: { type: "string", isRequired: true },
    lastname: { type: "string", isRequired: true },
    tel: { type: "string" },
  }),
  middlewares.user.register,
  middlewares.user.endRegister
)

module.exports = router
