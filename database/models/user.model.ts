import mongoose, { Schema } from "mongoose";
import { IUserModel } from "@database/d";

const userSchema = new Schema({
  firstname: String,
  lastname: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  role: {
    type: String,
    default: "Basic",
    required: true,
  },
});

export default mongoose.model<IUserModel>("User", userSchema);
