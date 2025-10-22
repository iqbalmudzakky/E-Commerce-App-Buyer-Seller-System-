const bcrypt = require("bcryptjs")

function hashPass(input) {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(input, salt)

  return hash
}

function checkPass(inputPass, instancePass) {
  return bcrypt.compareSync(inputPass, instancePass)
}

module.exports = { hashPass, checkPass }