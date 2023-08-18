import dotenv from "dotenv";
import Joi from "joi";
import path from "path";

dotenv.config({ path: path.join(__dirname, "../.env") });

const envSchemaVars = Joi.object()
  .keys({
    PORT: Joi.number().default(8000),
    DEV_DATABASE_URL: Joi.string().required().description('Development database is required'),
    ENV: Joi.string()
  })
  .unknown(true);

const { value: envVars, error } = envSchemaVars
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error ${error.message}`);
}

const envs = {
  port: envVars.PORT,
  dev_database_url: envVars.DEV_DATABASE_URL,
  env: envVars.ENV
};

export default envs;
