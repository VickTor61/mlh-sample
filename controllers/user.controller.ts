import { Request, Response } from "express";
import { UserService } from "./services";
import catchAsync from "../utils/catchAsync";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const response = await UserService.createUser(req.body);
  res.cookie("jwt", response.token, {
    httpOnly: true,
    maxAge: 3600 * 1000, // 1hr in ms
  });
  return res.send(response);
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const response = await UserService.loginUser(req.body);
  return res.send(response);
});

export default {
  createUser,
  loginUser,
};
