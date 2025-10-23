/*
// BCRYPT JS <<-- bisa ditaro di helper

// import bcrypt from "bcryptjs";
const bcrypt = require("bcryptjs")

// Hash Password - pakai di register
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync("apa ya", salt); // <-- set hash password 

console.log(hash, "<<-- ini hash password");

// Check Password - pakai di login
console.log(bcrypt.compareSync("apa ya", hash), "<<-- pass bener"); // true
console.log(bcrypt.compareSync("ngasal aja", hash), "<<-- pass salah"); // false
*/

/*
// MIDDLEWARE
const express = require('express')
const app = express()

// app.use((req, res, next) => {
//   console.log('Time:', Date.now())
//   next()
// }) // <<-- middleware global, dipasang setelah routes Auth

let middleware = function (req, res, next) {
  console.log('Time:', Date.now())
  next() // <<-- ini penting agar tidak pending
}

app.use('/user/:id', middleware, HomeController.getUser) // <<-- middleware khusus untuk handle 1 routes
*/

/*
// EXPRESS-SESSION
const express = require('express')
let session = require('express-session')

const app = express()
const port = 3000

app.use(express.urlencoded({ extended: false }))
app.use(session({
  secret: 'input can be anything', // <<-- can be filled with any string, but keep it your self
  resave: false, // <<-- false (recom) jika hanya ingin save kalau ada perubahan di db, true jika ada atau tidaknya perubahan tetap di save
  saveUninitialized: false, // <<-- recom false for login session
  cookie: {
    secure: false, // <<-- true jika untuk https, ini berkaitan untuk production
    sameSite: true // <<-- for security from csrf attack
  }
}))

app.use(router)

app.listen(port, () => {
  console.log(`listening on port ${port}`);
})
*/

let obj = { a: 1 }
let arr = [1, 2]

console.log(typeof arr);


