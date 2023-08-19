import bcrypt from "bcryptjs";

export const hashPassword = async (password: string) => {
  if (password.length < 5) {
    throw new Error("Password is too short");
  }
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return { salt, hash };
};
