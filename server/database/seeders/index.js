const filesReader = require("../../helpers/readFiles");
const db = require("../index");

const seeds = filesReader(__dirname, __filename);

(async () => {
  const promises = Object.keys(seeds).map(async seedName =>
    db.query(...seeds[seedName])
  );
  await Promise.all(promises);
})();
