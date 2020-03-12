const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  development: {
    env_db: "DATABASE_DEV"
  },
  test: {
    env_db: "DATABASE_TEST"
  },
  production: {
    env_db: "DATABASE_URL"
  }
};
