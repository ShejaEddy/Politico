const filesReader = require("../../helpers/readFiles");

const models = filesReader(__dirname, __filename);
module.exports = models;
