import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGODB_URL = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB;

const url = `${MONGODB_URL}/${MONGODB_DB}`;
export const connectdb = () => {
  mongoose
    .connect(url)
    .then((c) => {
      console.log(`database connected with ${c.connection.host}`);
    })
    .catch((e) => {
      console.log(e);
    });
};
