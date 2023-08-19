import userModel from "@database/models/user.model";
import { hashPassword } from "../../helpers/user.helper";
import httpStatus from "http-status";
import ApiError from "../../utils/AppError";

const checkDuplicateEmail = async (email: string) => {
  const foundUser = await userModel.findOne({ email });
  if (foundUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User already exits");
  }
};

const createUser = async (userData: {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}) => {
  const { email, password } = userData;
  await checkDuplicateEmail(email);

  const encryptedPassword = await hashPassword(password);
  const user = await userModel.create({
    ...userData,
    password: encryptedPassword.hash,
  });
  return user;
};

export default {
  createUser,
};
