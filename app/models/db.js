const sqlite3 = require("sqlite3");
const dbConfig = require('../config/config.db.js');

const connection = new sqlite3.Database(dbConfig.DB, (error) => {
  if (error) {
    console.log("Database not created due to some problem", error);
  } else {
    console.log("Database is created successfully...");
    const createTableQuery = `CREATE TABLE IF NOT EXISTS tutorials
    (id INTEGER PRIMARY KEY AUTOINCREMENT, 
        title VARCHAR(250), 
        description VARCHAR(255), 
        published BOOLEAN DEFAULT FALSE
    )`;
    connection.run(createTableQuery, (error) => {
      if (error) {
        console.log("Table is not created..", error);
      } else {
        console.log("Tutorials is created...");
      }
    });
  }
});

module.exports = connection;