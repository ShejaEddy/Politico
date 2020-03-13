const filesReader = require("../../helpers/readFiles");
const db = require("../index");
const logger = require("../../helpers/logger");

const seeds = filesReader(__dirname, __filename);

(async () => {
  const promises = Object.keys(seeds).map(async seedName => {
    logger.info(`seeding ${seedName}...`);
    await db
      .query(...seeds[seedName])
      .then(() => logger.info(`${seedName} seeded successfully`));
  });
  await Promise.all(promises);
})().catch(error => logger.error(error));
