module.exports = (err, req, res, next) => {
  res.status(err.httpStatusCode).json({
    error: err.message
  })
}
