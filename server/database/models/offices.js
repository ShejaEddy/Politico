const migrateUp = `CREATE TABLE IF NOT EXISTS
                      office_tb (
                          id SERIAL NOT NULL PRIMARY KEY,
                          type VARCHAR(255) NOT NULL,
                          name VARCHAR(255) NOT NULL UNIQUE,
                          created_at TIMESTAMP
                      )`;

const findAll = "SELECT * FROM office_tb";
const findOne = "SELECT * FROM office_tb WHERE id = $1";
const create = `INSERT INTO office_tb(type, name, location, contact, created_at)
                      VALUES ($1, $2, $3, $4, $5)
                      RETURNING *`;
const deleteOne = "DELETE FROM party_tb WHERE id = $1";
const update = "UPDATE party_tb SET name = $2 WHERE id = $1 RETURNING *";

module.exports = { migrateUp, findAll, findOne, create, update, deleteOne };
