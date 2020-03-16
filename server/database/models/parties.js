const migrateUp = `CREATE TABLE IF NOT EXISTS 
                      party_tb (
                          id SERIAL NOT NULL PRIMARY KEY,
                          name VARCHAR(255) NOT NULL UNIQUE,
                          hqAddress VARCHAR(255) NOT NULL,
                          logoUrl VARCHAR(511) NOT NULL,
                          created_at TIMESTAMP,
                          updated_at TIMESTAMP
                      )`;

const findAll = "SELECT * FROM party_tb";
const findById = "SELECT * FROM party_tb WHERE id = $1";
const deleteOne = "DELETE FROM party_tb WHERE id = $1";

module.exports = { migrateUp, findAll, findById, deleteOne };
