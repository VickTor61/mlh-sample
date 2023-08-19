import { Request, Response } from "express";
import { UserService } from "./services";

const createUser = async (req: Request, res: Response) => {
  try {
    const response = await UserService.createUser(req.body);
    res.send(response);
  } catch (e) {
    res.send(`Error ${e}`);
  }
};

export default {
  createUser,
};
