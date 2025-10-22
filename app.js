const express = require("express")
let session = require("express-session")

const router = require("./routes/index")

const app = express()
const port = 3000

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }))
app.use(session({
  secret: 'input can be anything',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    sameSite: true
  }
}))

app.use(router)

app.listen(port, () => {
  console.log(`App running on port: ${port}`);
})