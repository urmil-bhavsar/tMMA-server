const mongoose = require("mongoose");
const { constants } = require("../constants");
require("dotenv").config();

const dbConnect = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${constants.DB_NAME}`);
    console.log(
      "\nDB connection established DBname: ",
      connectionInstance.connection.name
    );
  } catch (error) {
    console.error("Error connecting to the database", error);
    process.exit(1);
  }
};

module.exports = { dbConnect };
