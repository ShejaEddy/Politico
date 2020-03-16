const moment = require("moment");

const data = [1, 1, 1, moment(new Date()), moment(new Date())];
module.exports = [
  `INSERT INTO candidate_tb (office, party, candidate, created_at)
                        VALUES ($1, $2, $3, $4)
                        RETURNING *`,
  data
];
