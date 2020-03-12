const db = require("../index");

const drop = `DROP TABLE IF EXISTS  user_info, office_tb, party_tb, vote_tb, candidate_tb`;
(async () => {
  console.log("Deleting tables ...");
  return await db
    .query(drop)
    .then(() => console.log("Tables deleted successfully"));
})();
