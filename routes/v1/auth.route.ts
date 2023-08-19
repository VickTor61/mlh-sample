import express from "express";
import userController from "@controllers/user.controller";
import userValidation from "@middlewares/validations/user.validation";
import validate from "@middlewares/validate";
const router = express.Router();

router.post(
  "/signup",
  validate(userValidation.registerUser),
  userController.createUser
);

export default router;
