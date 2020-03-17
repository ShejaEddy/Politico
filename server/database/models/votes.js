const migrateUp = `CREATE TABLE IF NOT EXISTS 
                      vote_tb (
                          id SERIAL NOT NULL,
                          voter INTEGER NOT NULL,
                          office INTEGER NOT NULL,
                          candidate INTEGER NOT NULL,
                          created_at TIMESTAMP,
                          updated_at TIMESTAMP,
                          PRIMARY KEY (office, voter)
                      )`;
const results = `SELECT office,  candidate, CAST(COUNT(*)AS Int) AS result 
                      FROM vote_tb WHERE office = $1 GROUP BY candidate, office`;

module.exports = { migrateUp, results };
