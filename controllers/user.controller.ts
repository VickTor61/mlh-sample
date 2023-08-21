import { Request, Response } from "express";
import { UserService } from "./services";
import catchAsync from "../utils/catchAsync";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const response = await UserService.createUser(req.body);
  res.send(response);
});

export default {
  createUser,
};
