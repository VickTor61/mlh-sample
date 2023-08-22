import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import httpStatus from "http-status";
import ApiError from "../utils/AppError";
import config from '../config/config'

export const hashPassword = async (password: string) => {
  if (password.length < 5) {
    throw new ApiError(
      httpStatus.UNPROCESSABLE_ENTITY,
      "Password is too short"
    );
  }
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return { salt, hash };
};

export const decryptPassword = async (
  password: string,
  hashedPassword: string
) => {
  const comparePassword = await bcrypt.compare(password, hashedPassword);
  return comparePassword;
};

export const createToken = async (user: any) => {
  const token = jwt.sign(
    {
      data: user,
    },
    config.secret,
    { expiresIn: "1h" }
  );
  return token;
};
