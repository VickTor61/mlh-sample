import { Request, Response } from "express";

const catchAsync = (fn: Function) => {
  return (req: Request, res: Response, next: Function) => {
    Promise.resolve(fn(req, res, next)).catch((e) => next(e));
  };
};

export default catchAsync;
