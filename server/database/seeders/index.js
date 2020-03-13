/* eslint-disable no-console */
const filesReader = require("../../helpers/readFiles");
const db = require("../index");

const seeds = filesReader(__dirname, __filename);

(async () => {
  const promises = Object.keys(seeds).map(async seedName => {
    console.log(`seeding ${seedName}...`);
    await db
      .query(...seeds[seedName])
      .then(() => console.log(`${seedName} seeded successfully`));
  });
  await Promise.all(promises);
})().catch(error => console.log(error));
