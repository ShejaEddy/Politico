const moment = require("moment");
<<<<<<< HEAD
=======
const models = require("../models");
>>>>>>> feature(view-user-profile): user get profile  [Finishes #171742809]
const bcrypt = require("../../helpers/bcrypt");

const data = [
  "Sheja",
  "Eddy",
  "patron",
  "admin@example.com",
  "0784141587",
  "1234567890987",
<<<<<<< HEAD
  "https://avatar.png",
=======
  "hhts://avatar.png",
>>>>>>> feature(view-user-profile): user get profile  [Finishes #171742809]
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
