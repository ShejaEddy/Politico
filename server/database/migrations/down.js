const db = require("../index");

const drop = `DROP TABLE IF EXISTS  user_info, office_tb, party_tb, vote_tb, candidate_tb`;

(() => db.query(drop))();
