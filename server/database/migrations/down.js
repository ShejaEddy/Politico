const db = require("../index");
const logger = require("../../helpers/logger");

const drop = `DROP TABLE IF EXISTS  user_info, office_tb, party_tb, vote_tb, candidate_tb`;
(async () => {
  logger.info("Deleting tables...");
  await db.query(drop).then(() => logger.info("Tables deleted successfully"));
})();
