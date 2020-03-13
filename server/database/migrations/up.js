const models = require("../models");
const db = require("../index");
const logger = require("../../helpers/logger");

(async () => {
  logger.info("Creating tables ...");
  const promises = Object.keys(models).map(modelName =>
    db.query(models[modelName].migrateUp)
  );
  await Promise.all(promises).then(() =>
    logger.info("Tables created successfully")
  );
})().catch(error => logger.error(error));
