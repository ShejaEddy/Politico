const migrateUp = `CREATE TABLE IF NOT EXISTS 
                      user_info (
                          id SERIAL NOT NULL PRIMARY KEY,
                          firstname VARCHAR(255) NOT NULL,
                          lastname VARCHAR(255) NOT NULL,
                          othername VARCHAR(255) NOT NULL,
                          email VARCHAR(255) NOT NULL UNIQUE,
                          phoneNumber VARCHAR(255) NOT NULL UNIQUE,
                          passportUrl VARCHAR(511) NOT NULL,
                          isAdmin BOOLEAN NOT NULL,
                          password VARCHAR(255) NOT NULL,
                          created_at TIMESTAMP
                      )`;
const login = `SELECT * FROM user_info WHERE email= $1`;
const findById = `SELECT * FROM user_info WHERE id = $1`;
const create = `INSERT INTO user_info (firstname, lastname, othername, email, phoneNumber, passportUrl, password, isAdmin, created_at)
                        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                        RETURNING *`;
const update = "UPDATE user_info SET firstname = $2 WHERE id = $1 RETURNING *";

module.exports = { migrateUp, login, findById, create, update };
