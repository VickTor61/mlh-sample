import userModel from "@database/models/user.model";
import {
  hashPassword,
  decryptPassword,
  createToken,
} from "../../helpers/user.helper";
import httpStatus from "http-status";
import ApiError from "../../utils/AppError";

type userCred = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

const checkDuplicateEmail = async (email: string) => {
  const foundUser = await userModel.findOne({ email });
  if (foundUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User already exits");
  }
};

const createUser = async (userData: userCred) => {
  const { email, password } = userData;
  await checkDuplicateEmail(email);

  const encryptedPassword = await hashPassword(password);
  const user = await userModel.create({
    ...userData,
    password: encryptedPassword.hash,
  });
  const token = await createToken(user);
  return { user, token };
};

const loginUser = async (loginData: userCred) => {
  const user = await userModel.findOne({ email: loginData.email });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User email not found");
  }

  if (!(await decryptPassword(loginData.password, user.password))) {
    throw new ApiError(httpStatus.NOT_FOUND, "Login not successful");
  }

  return user;
};
export default {
  createUser,
  loginUser,
};
