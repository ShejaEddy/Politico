var filesReader = require("../../helpers/readFiles"),
  db = require("../index");

const seeds = filesReader(__dirname, __filename);

(async () => {
  const promises = Object.keys(seeds).map(async seedName => {
    console.log("seeding " + seedName + "...");
    return await db
      .query(...seeds[seedName])
      .then(() => console.log(seedName + " seeded successfully"));
  });
  return await Promise.all(promises);
})().catch(error => console.log(error));
