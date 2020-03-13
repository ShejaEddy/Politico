var path = require("path"),
  fs = require("fs");

module.exports = (dir, name) => {
  const basename = path.basename(name);
  String.prototype.capitalize = function() {
    return this && this[0].toUpperCase() + this.slice(1);
  };
  const files = fs
    .readdirSync(dir)
    .filter(
      file =>
        file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );

  return files.reduce((acc, file) => {
    const context = require(path.join(dir, file));
    acc[file.replace(".js", "").capitalize()] = context;
    return acc;
  }, {});
};
