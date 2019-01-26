function Validator(bluePrint){
  return (req, res, next) => {
    const validateBodyPass = Object.keys(bluePrint).reduce((previousValue, currentKey) => {
      return (
        (typeof req.body[currentKey] === bluePrint[currentKey].type || Array.isArray(req.body[currentKey]) ||!bluePrint[currentKey].isRequired)
        && ((bluePrint[currentKey].isRequired && req.body[currentKey]) ||!bluePrint[currentKey].isRequired)
        && previousValue
      )
    }, true)
    if(validateBodyPass) return next()
    else{
      const err = new Error("Request body invalid")
      err.httpStatusCode = 400
      return next(err)
    }
  }
}

module.exports = Validator
