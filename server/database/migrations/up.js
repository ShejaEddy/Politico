const models = require("../models");
const db = require("../index");

(async () => {
  const promises = Object.keys(models).map(modelName =>
    db.query(models[modelName].migrateUp)
  );
  await Promise.all(promises);
})();
