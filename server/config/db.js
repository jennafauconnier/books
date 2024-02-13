require('dotenv').config()
const mongoose = require('mongoose')

mongoose.set("strictQuery", true, "useNewUrlParser", true)

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)
    console.log("Connected to DB ⚙️")
  } catch (err) {
    console.error(err.message)
    console.log("Error to connect to DB ⛔️")

    process.exit(1)
  }
}
module.exports = connectDB