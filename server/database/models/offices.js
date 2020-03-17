const migrateUp = `CREATE TABLE IF NOT EXISTS
                      office_tb (
                          id SERIAL NOT NULL PRIMARY KEY,
                          type VARCHAR(255) NOT NULL,
                          name VARCHAR(255) NOT NULL UNIQUE,
                          created_at TIMESTAMP,
                          updated_at TIMESTAMP
                      )`;

const findAll = "SELECT * FROM office_tb";
const findById = "SELECT * FROM office_tb WHERE id = $1";
const deleteOne = "DELETE FROM office_tb WHERE id = $1";

module.exports = { migrateUp, findAll, findById, deleteOne };
