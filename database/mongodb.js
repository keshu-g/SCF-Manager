const { connect } = require("mongoose");
const { MONGODB_URI, DB_NAME } = require("../constants");

const connectDB = async () => {
  try {

    console.log(`Connecting to DB : ${MONGODB_URI}/${DB_NAME}`);
    const connectionInstance = await connect(`${MONGODB_URI}/${DB_NAME}`);

    console.log(`MongoDB Connected : ${connectionInstance.connection.name} : ${connectionInstance.connection.host}`);
  } catch (err) {
    console.log(`DB Error: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
