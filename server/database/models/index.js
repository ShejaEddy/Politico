var path = require("path"),
  fs = require("fs");

const models = {};
const basename = path.basename(__filename);
String.prototype.capitalize = function() {
  return this && this[0].toUpperCase() + this.slice(1);
};
fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file));
    models[file.replace(".js", "").capitalize()] = model;
  });

module.exports = models;
