const migrateUp = `CREATE TABLE IF NOT EXISTS 
                      party_tb (
                          id SERIAL NOT NULL PRIMARY KEY,
                          name VARCHAR(255) NOT NULL,
                          hqAddress VARCHAR(255) NOT NULL,
                          logoUrl VARCHAR(511) NOT NULL,
                          created_at TIMESTAMP
                      )`;

const findAll = "SELECT * FROM party_tb";
const findOne = "SELECT * FROM party_tb WHERE id = $1";
const update = "UPDATE party_tb SET name = $2 WHERE id = $1 RETURNING *";
const deleteOne = "DELETE FROM party_tb WHERE id = $1";
const create = `INSERT INTO party_tb (name, hqaddress, logourl, created_at)
                      VALUES ($1, $2, $3, $4, $5, $6, $7)
                      RETURNING *`;

module.exports = { migrateUp, findAll, findOne, create, deleteOne, update };
