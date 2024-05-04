import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";

dotenv.config();

const connectDB = async () => {
  return mongoose
    .connect(process.env.DB_URI)
    .then((conn) => {
      console.log(
        `Connected to MongoDB server ${conn.connection.host}`.cyan.underline
          .bold
      );
    })
    .catch((err) => console.log(err));
};

export default connectDB;
