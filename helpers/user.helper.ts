import bcrypt from "bcryptjs";
import httpStatus from "http-status";
import ApiError from "../utils/AppError";

export const hashPassword = async (password: string) => {
  if (password.length < 5) {
    throw new ApiError(
      httpStatus.UNPROCESSABLE_ENTITY,
      "Password is too short"
    );
  }
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return { salt, hash };
};
