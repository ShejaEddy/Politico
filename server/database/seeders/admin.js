const moment = require("moment");
const bcrypt = require("../../helpers/bcrypt");

const data = [
  "Sheja",
  "Eddy",
  "patron",
  "admin@example.com",
  "0784141587",
  "1234567890987",
  "https://avatar.png",
  bcrypt.hashPassword("password"),
  true,
  moment(new Date()),
  moment(new Date())
];
module.exports = [
  `INSERT INTO user_info (firstname, lastname, othername, email, phoneNumber, nationalId, passportUrl, password, isAdmin, created_at, updated_at)
                        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
                        RETURNING *`,
  data
];
