const migrateUp = `CREATE TABLE IF NOT EXISTS 
                      user_info (
                          id SERIAL NOT NULL PRIMARY KEY,
                          firstname VARCHAR(255) NOT NULL,
                          lastname VARCHAR(255) NOT NULL,
                          othername VARCHAR(255) NOT NULL,
                          email VARCHAR(255) NOT NULL UNIQUE,
                          phoneNumber VARCHAR(255) NOT NULL UNIQUE,
                          passportUrl VARCHAR(511) NOT NULL,
                          nationalId VARCHAR(511) NOT NULL UNIQUE,
                          isAdmin BOOLEAN NOT NULL,
                          password VARCHAR(255) NOT NULL,
                          created_at TIMESTAMP,
                          updated_at TIMESTAMP
                      )`;
const findByEmail = `SELECT * FROM user_info WHERE email= $1`;
const findById = `SELECT * FROM user_info WHERE id = $1`;

module.exports = { migrateUp, findByEmail, findById };
