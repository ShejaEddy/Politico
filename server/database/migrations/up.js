const models = require("../models");
const db = require("../index");

(async () => {
  console.log("Creating tables ...");
  const promises = Object.keys(models).map(
    async modelName => await db.query(models[modelName].migrateUp)
  );
  return await Promise.all(promises).then(() =>
    console.log("Tables created successfully")
  );
})().catch(error => console.log(error));
