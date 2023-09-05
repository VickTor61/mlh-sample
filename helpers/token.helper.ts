import jwt from "jsonwebtoken";
import randToken from "rand-token";
import config from "../config/config";
import { Types } from "mongoose";

export const generateToken = async (userId: Types.ObjectId | string) => {
  const payload = {
    userId,
    expiresIn: "1h",
  };
  const token = jwt.sign(payload, config.secret);
  return token;
};

export const generateRefreshToken = async (userId: Types.ObjectId) => {
  const payload = {
    userId,
    expiresIn: "1d",
  };
  const refreshToken = jwt.sign(payload, config.secret);
  return refreshToken;
};
