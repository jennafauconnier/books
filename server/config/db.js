require('dotenv').config()
const mongoose = require('mongoose')

const db = `mongodb+srv://jennafauconnier:${process.env.DB_PASSWORD}@cluster-book.tecaruz.mongodb.net/?retryWrites=true&w=majority`

mongoose.set("strictQuery", true, "useNewUrlParser", true)

const connectDB = async () => {
  try {
    await mongoose.connect(db)
    console.log("Connected to DB ⚙️")
  } catch (err) {
    console.error(err.message)
    console.log("Error to connect to DB ⛔️")

    process.exit(1)
  }
}
module.exports = connectDB