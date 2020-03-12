const bcrypt = require("../../helpers/bcrypt");
const moment = require("moment");
const models = require("../models");

const { Users } = models;
const data = [
  "Sheja",
  "Eddy",
  "patron",
  "admin@example.com",
  "0784141587",
  "hhts://avatar.png",
  bcrypt.hashPassword("password"),
  true,
  moment(new Date())
];
module.exports = [Users.create, data];
