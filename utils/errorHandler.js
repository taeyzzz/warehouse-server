module.exports = (err, req, res, next) => {
  res.status(403).json({
    error: err.message
  })
}
