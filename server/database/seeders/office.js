const moment = require("moment");

const data = [
  "President of the state",
  "Legislative",
  moment(new Date()),
  moment(new Date())
];
module.exports = [
  `INSERT INTO office_tb (name, type, created_at, updated_at)
                        VALUES ($1, $2, $3, $4)
                        RETURNING *`,
  data
];
