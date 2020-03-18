const migrateUp = ` CREATE TABLE IF NOT EXISTS 
                      candidate_tb (
                          id SERIAL NOT NULL,
                          office INTEGER NOT NULL,
                          party INTEGER NOT NULL,
                          candidate INTEGER NOT NULL UNIQUE,
                          created_at TIMESTAMP,
                          updated_at TIMESTAMP,
                          PRIMARY KEY (candidate, office)
                      )`;

const findAll = "SELECT * FROM candidate_tb";
const findOne =
  "SELECT * FROM candidate_tb WHERE candidate = $1 AND office = $2";
module.exports = { migrateUp, findAll, findOne };
