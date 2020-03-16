const moment = require("moment");
const bcrypt = require("../../helpers/bcrypt");

const data = [
  "Sheja",
  "Eddy",
  "patron",
  "user@example.com",
  "0784141580",
  "120000000000000000",
  "https://avatar.png",
  bcrypt.hashPassword("password"),
  false,
  moment(new Date()),
  moment(new Date())
];
module.exports = [
  `INSERT INTO user_info (firstname, lastname, othername, email, phoneNumber, nationalId, passportUrl, password, isAdmin, created_at, updated_at)
                        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
                        RETURNING *`,
  data
];
