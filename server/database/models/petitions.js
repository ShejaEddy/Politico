const migrateUp = `CREATE TABLE IF NOT EXISTS 
                      petition_tb (
                          id SERIAL NOT NULL,
                          createdBy INTEGER NOT NULL,
                          office INTEGER NOT NULL,
                          body VARCHAR(511) NOT NULL,
                          evidence TEXT [] NOT NULL,
                          created_at TIMESTAMP,
                          PRIMARY KEY (createdBy, office)
                      )`;
const findAll = "SELECT * FROM petition_tb";
const findOne = "SELECT * FROM petition_tb WHERE id = $1";

module.exports = { migrateUp, findOne, findAll };
