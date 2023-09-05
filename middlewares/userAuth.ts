import { Request, Response } from "express";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import config from "../config/config";
import ApiError from "../utils/AppError";

interface customRequest extends Request {
  user?: any;
}

const userAuth = (req: customRequest, res: Response, next: Function) => {
  const accessToken = req.headers["authorization"] as string;
  const refreshToken = req.cookies["refreshToken"];

  if (!accessToken && !refreshToken) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Access Denied. No token provided."
    );
  }

  const decodedToken: any = jwt.verify(accessToken, config.secret);
  req.user = decodedToken.userId;
  return next();
};
export default userAuth;
