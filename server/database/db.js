const mongoose = require("mongoose")
const databaseUrl = "mongodb://127.0.0.1:27017/testBDD";

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(databaseUrl, { useNewUrlParser: true })
    console.log("Mongo connecté")
  } catch (error) {
    console.log(error);
    process.exit()
  }
}

module.exports = connectDB

