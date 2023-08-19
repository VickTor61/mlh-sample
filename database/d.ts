import { Types } from "mongoose";

export interface IUserModel {
  id: Types.ObjectId;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}
