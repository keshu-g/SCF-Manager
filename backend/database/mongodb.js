import { connect } from "mongoose";
import constants from "../constants.js";
const { MONGODB_URI, DB_NAME } = constants;

const connectDB = async () => {
  try {
    const connectionInstance = await connect(`${MONGODB_URI}/${DB_NAME}`);

    console.log(
      `MongoDB Connected : ${connectionInstance.connection.name} : ${connectionInstance.connection.host}`
    );
  } catch (err) {
    console.log(`DB Error: ${err}`);
    process.exit(1);
  }
};

export default connectDB;
