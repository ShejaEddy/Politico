const moment = require("moment");

const data = [
  "GREEN PARTY",
  "hqAddress",
  "https://avatar.png",
  moment(new Date()),
  moment(new Date())
];
module.exports = [
  `INSERT INTO party_tb (name, hqAddress, logoUrl, created_at, updated_at)
                        VALUES ($1, $2, $3, $4, $5)
                        RETURNING *`,
  data
];
