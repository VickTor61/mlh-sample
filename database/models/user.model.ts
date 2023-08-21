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
});

export default mongoose.model<IUserModel>("User", userSchema);
