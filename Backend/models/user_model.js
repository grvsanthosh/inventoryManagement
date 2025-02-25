import mongoose from "mongoose";
import { validateEmail } from '../common/Validation.js'
const Userschema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate:{
        validator: validateEmail,
        message: (props) => `${props.value} is not a valid email!`
    }
    },
    password: {
      type: String,
      required: true,
      select: false, //password won't included mainly used for sensitive info
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timeStamps: true,
  }
);

const User = mongoose.model("User", Userschema);

export default User;
