const bcrypt = require("bcryptjs")

function hashPass(input) {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(input, salt)

  return hash
}

module.exports = { hashPass }