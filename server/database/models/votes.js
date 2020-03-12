const migrateUp = `CREATE TABLE IF NOT EXISTS 
                      vote_tb (
                          id SERIAL NOT NULL,
                          createdBy INTEGER NOT NULL,
                          office INTEGER NOT NULL,
                          candidate INTEGER NOT NULL,
                          createdOn TIMESTAMP,
                          PRIMARY KEY (office, createdBy)
                      )`;
const create = `INSERT INTO vote_tb (createdBy, office, candidate, createdOn)
                  VALUES ($1, $2, $3, $4) RETURNING *`;
const results = `SELECT office,  candidate, CAST(COUNT(*)AS Int) AS result 
                      FROM vote_tb WHERE office = $1 GROUP BY candidate, office`;

module.exports = { migrateUp, create, results };
