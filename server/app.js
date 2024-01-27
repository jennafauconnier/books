require('dotenv').config()
const express = require('express')
const db = require('./config/db')
const cors = require("cors")
const bookRoutes = require("./routes/books")
const usersRoutes = require("./routes/users")
const bodyParser = require("body-parser")

const PORT = process.env.PORT

const app = express()

app.use(cors({ origin: true, credentials: true }))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use("/books", bookRoutes)
app.use("/users", usersRoutes)

db()

app.get('/', (req, res) => res.send('Hello world'))
app.listen(PORT, () => console.log(`Server is running on port : ${PORT} 🚀`))