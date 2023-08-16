import express, { Request, Response } from "express";
const router = express.Router();

router.get("/profile", (req: Request, res: Response) => {
  return res.send("coming from the profile");
});
export default router;
