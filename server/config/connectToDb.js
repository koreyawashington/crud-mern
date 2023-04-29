//load .env file variables
if(process.env.NODE_ENV != "production") {
    require("dotenv").config()
}


const mongoose = require("mongoose")

async function connectToDb() {
    console.log("Connected to Db");
    await mongoose.connect(process.env.DB_URL)
}
module.exports = connectToDb;