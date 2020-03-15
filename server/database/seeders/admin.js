const moment = require("moment");
const models = require("../models");
const bcrypt = require("../../helpers/bcrypt");

const { Users } = models;
const data = [
  "Sheja",
  "Eddy",
  "patron",
  "admin@example.com",
  "0784141587",
  "1234567890987",
  "hhts://avatar.png",
  bcrypt.hashPassword("password"),
  true,
  moment(new Date()),
  moment(new Date())
];
module.exports = [Users.create, data];
