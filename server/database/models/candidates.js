const migrateUp = ` CREATE TABLE IF NOT EXISTS 
                      candidate_tb (
                          id SERIAL NOT NULL,
                          office INTEGER NOT NULL,
                          party INTEGER NOT NULL,
                          candidate INTEGER NOT NULL UNIQUE,
                          PRIMARY KEY (candidate, office)
                      )`;

module.exports = { migrateUp };
