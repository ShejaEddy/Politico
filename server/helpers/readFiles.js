/* eslint-disable import/no-dynamic-require */

const path = require("path");
const fs = require("fs");

module.exports = (dir, name) => {
  const capitalize = str => {
    return str && str[0].toUpperCase() + str.slice(1);
  };
  const files = fs
    .readdirSync(dir)
    .filter(
      file =>
        file.indexOf(".") !== 0 &&
        file !== path.basename(name) &&
        file.slice(-3) === ".js"
    );

  return files.reduce((acc, file) => {
    // eslint-disable-next-line global-require
    const context = require(path.join(dir, file));
    acc[capitalize(file.replace(".js", ""))] = context;
    return acc;
  }, {});
};
