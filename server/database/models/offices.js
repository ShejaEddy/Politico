const migrateUp = `CREATE TABLE IF NOT EXISTS
                      office_tb (
                          id SERIAL NOT NULL PRIMARY KEY,
                          type VARCHAR(255) NOT NULL,
                          name VARCHAR(255) NOT NULL UNIQUE,
                          created_at TIMESTAMP,
                          updated_at TIMESTAMP
                      )`;

const findAll = "SELECT * FROM office_tb";
const findOne = "SELECT * FROM office_tb WHERE id = $1";
const create = `INSERT INTO office_tb(type, name, created_at, updated_at)
                      VALUES ($1, $2, $3, $4)
                      RETURNING *`;
const deleteOne = "DELETE FROM office_tb WHERE id = $1";

module.exports = { migrateUp, findAll, findOne, create, deleteOne };
