const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const userRouter = require("./routers/user")

const app = express()

const PORT = process.env.PORT || 4000

app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(morgan('dev'))

app.use("/user", userRouter)

app.get("/", (req, res) => {
  res.json({
    msg: "hello"
  })
})

app.listen(PORT, () => {
  console.log(`server running port: ${PORT}`);
});
