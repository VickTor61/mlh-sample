import dotenv from "dotenv";
import Joi from "joi";
import path from "path";
import httpStatus from "http-status";
import ApiError from "../utils/AppError";

dotenv.config({ path: path.join(__dirname, "../.env") });

const envSchemaVars = Joi.object()
  .keys({
    PORT: Joi.number().default(8000),
    DEV_DATABASE_URL: Joi.string()
      .required()
      .description("Development database is required"),
    ENV: Joi.string(),
    JWT_SECRET_KEY: Joi.string().required().description("jwt secret key"),
    SECRET: Joi.string().required().description('Auth secret')
  })
  .unknown(true);

const { value: envVars, error } = envSchemaVars
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new ApiError(
    httpStatus.UNPROCESSABLE_ENTITY,
    `Config validation error ${error.message}`
  );
}

const envs = {
  port: envVars.PORT,
  dev_database_url: envVars.DEV_DATABASE_URL,
  env: envVars.ENV,
  jwt_secret_key: envVars.JWT_SECRET_KEY,
  secret: envVars.SECRET
};

export default envs;
