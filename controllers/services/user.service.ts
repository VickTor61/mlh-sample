import userModel from "@database/models/user.model";
import Jwt, { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";
import config from "../../config/config";
import { hashPassword, decryptPassword } from "../../helpers/user.helper";
import httpStatus from "http-status";
import ApiError from "../../utils/AppError";
import {
  generateToken,
  generateRefreshToken,
} from "../../helpers/token.helper";

type userCred = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

const checkDuplicateEmail = async (email: string) => {
  const foundUser = await userModel.findOne({ email });
  if (foundUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User already exits");
  }
};

const createUser = async (userData: userCred) => {
  const { email, password } = userData;
  // await checkDuplicateEmail(email);

  const encryptedPassword = await hashPassword(password);
  const user = await userModel.create({
    ...userData,
    password: encryptedPassword.hash,
  });
  return user;
};

const loginUser = async (loginData: userCred) => {
  const user = await userModel.findOne({ email: loginData.email });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User email not found");
  }

  if (!(await decryptPassword(loginData.password, user.password))) {
    throw new ApiError(httpStatus.NOT_FOUND, "Login not successful");
  }
  const token = await generateToken(user._id);
  const refreshToken = await generateRefreshToken(user._id);
  return { user, token, refreshToken };
};

const refreshToken = async (refreshToken: string) => {
  const decodeToken = Jwt.verify(refreshToken, config.secret);
  const { userId }: any = decodeToken;
  const accessToken = await generateToken(userId);

  if (!accessToken) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid refresh token");
  }
  return accessToken
};

export default {
  createUser,
  loginUser,
  refreshToken,
};
