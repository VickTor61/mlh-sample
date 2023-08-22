import express from "express";
import userController from "@controllers/user.controller";
import userValidation from "@middlewares/validations/user.validation";
import validate from "@middlewares/validate";
import userAuth from "@middlewares/userAuth";
const router = express.Router();

router.get("/user", userAuth, async (req, res, next) => {
  res.send("Users routes");
});

router.post(
  "/signup",
  validate(userValidation.registerUser),
  userController.createUser
);

router.post(
  "/login",
  validate(userValidation.loginUser),
  userController.loginUser
);

export default router;
