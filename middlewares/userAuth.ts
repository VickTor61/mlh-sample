import { Request, Response } from "express";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import config from "../config/config";
import ApiError from "../utils/AppError";

const userAuth = (req: Request, res: Response, next: Function) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, config.secret, (err: any, decodedToken: any) => {
      if (err) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Not authorized");
      } else {
        next();
      }
    });
  } else {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Not authorised, token unavailable"
    );
  }
};
export default userAuth;
