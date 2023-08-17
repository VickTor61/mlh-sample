// import the database url from env config
import config from "../../config/config";

const databaseEnv = {
  development: {
    url: config.dev_database_url,
  },
};

export default databaseEnv;
