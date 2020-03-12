const migrateUp = `CREATE TABLE IF NOT EXISTS 
                      petition_tb (
                          id SERIAL NOT NULL,
                          createdBy INTEGER NOT NULL,
                          office INTEGER NOT NULL,
                          body VARCHAR(511) NOT NULL,
                          evidence VARCHAR (1023) NOT NULL,
                          createdOn TIMESTAMP,
                          PRIMARY KEY (createdBy, office)
                      )`;
const create = `INSERT INTO petition_tb (createdby, office, body, evidence, createdOn) 
  VALUES ($1, $2, $3, $4, $5) RETURNING *`;
const findAll = "SELECT * FROM petition_tb";
const findOne = "SELECT * FROM petition_tb WHERE id = $1";

module.exports = { migrateUp, create, findOne, findAll };
