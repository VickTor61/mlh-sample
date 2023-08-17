import dotenv from "dotenv";
import Joi from "joi";
import path from "path";

dotenv.config({ path: path.join(__dirname, "../.env") });

const envSchemaVars = Joi.object()
  .keys({
    PORT: Joi.number().default(8000),
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
};

export default envs;
