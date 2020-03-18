const migrateUp = `CREATE TABLE IF NOT EXISTS 
                      petition_tb (
                          id SERIAL NOT NULL,
                          createdBy INTEGER NOT NULL,
                          office INTEGER NOT NULL,
                          body VARCHAR(511) NOT NULL,
                          evidence TEXT [] NOT NULL,
                          created_at TIMESTAMP,
                          updated_at TIMESTAMP,
                          PRIMARY KEY (createdBy, office)
                      )`;
const findAll = "SELECT * FROM petition_tb";
const findById = "SELECT * FROM petition_tb WHERE id = $1";
const findByUser = "SELECT * FROM petition_tb WHERE createdBy = $1";
const findByUserPetition =
  "SELECT * FROM petition_tb WHERE id = $1 AND createdBy = $2";
const deleteOne = "DELETE FROM petition_tb WHERE id = $1 AND createdBy = $2";

module.exports = {
  migrateUp,
  findById,
  findByUser,
  findAll,
  findByUserPetition,
  deleteOne
};
