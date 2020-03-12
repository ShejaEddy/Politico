var path = require("path"),
  fs = require("fs"),
  db = require("../index");

const seeds = {};
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
    const seed = require(path.join(__dirname, file));
    seeds[file.replace(".js", "").capitalize()] = seed;
  });

(async () => {
  const promises = Object.keys(seeds).map(async seedName => {
    console.log("seeding " + seedName + "...");
    return await db
      .query(...seeds[seedName])
      .then(() => console.log(seedName + " seeded successfully"));
  });
  return await Promise.all(promises);
})().catch(error => console.log(error));
