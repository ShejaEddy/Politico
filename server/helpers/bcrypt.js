const bcrypt = require("bcrypt");
module.exports = {
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  },
  comparePassword(hashPassword, password) {
    return bcrypt.compare(password, hashPassword);
  }
};
