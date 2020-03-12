const migrateUp = ` CREATE TABLE IF NOT EXISTS 
                      candidate_tb (
                          id SERIAL NOT NULL,
                          office INTEGER NOT NULL,
                          party INTEGER NOT NULL,
                          candidate INTEGER NOT NULL,
                          PRIMARY KEY (candidate, office)
                      )`;
const create = `INSERT INTO candidate_tb (office, party, candidate)
                        VALUES ($1, $2, $3) RETURNING *`;

module.exports = { create, migrateUp };
