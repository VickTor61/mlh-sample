import { Request, Response } from "express";
import { UserService } from "./services";

const createUser = async (req: Request, res: Response) => {
  const response = await UserService.createUser(req.body);
  res.send(response);
};

export default {
  createUser,
};
