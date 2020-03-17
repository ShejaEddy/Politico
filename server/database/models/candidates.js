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

module.exports = { migrateUp };
