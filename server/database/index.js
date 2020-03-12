const { Pool } = require("pg");
const dbConfig = require("../config/db.config");
const env = process.env.NODE_ENV || "development";
const config = dbConfig[env];

const pool = new Pool({
  connectionString: process.env[config.env_db]
});

module.exports = {
  query: (text, params) => pool.query(text, params)
};
