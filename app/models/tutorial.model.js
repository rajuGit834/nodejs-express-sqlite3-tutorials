const sqlite3 = require("./db.js");
const Tutorial = function (newTutorial) {
  this.title = newTutorial.title;
  this.description = newTutorial.description;
  this.published = newTutorial.published;
};

Tutorial.create = (newTutorial, result) => {
  const insertQuery = `INSERT INTO tutorials
    (title, description, published)
    VALUES(?, ?, ?)`;

  sqlite3.run(
    insertQuery,
    [newTutorial.title, newTutorial.description, newTutorial.published],
    function (error) {
      if (error) {
        return result(error, null);
      }
      return result(null, { id: this.lastID, ...newTutorial });
    }
  );
};

Tutorial.findById = (id, result) => {
  const findQuery = `SELECT * FROM tutorials WHERE id = ?`;
  sqlite3.all(findQuery, [id], (error, row) => {
    if (error) {
      return result(error, null);
    }
    return result(null, row);
  });
};

Tutorial.findAll = (result) => {
  const findAllQuery = `SELECT * FROM tutorials`;
  sqlite3.all(findAllQuery, [], (error, rows) => {
    if (error) {
      return result(error, null);
    }
    return result(null, rows);
  });
};

Tutorial.findPublishedTut = (result) => {
  const publishedQuery = `SELECT * FROM tutorials WHERE published = ?`;
  sqlite3.all(publishedQuery, [true], (error, rows) => {
    if (error) {
      return result(error, null);
    }
    return result(null, rows);
  });
};

Tutorial.updateById = (id, newTutorial, result) => {
  const updateQuery = `UPDATE tutorials 
    SET title = ?, 
    description = ?, 
    published = ? 
    WHERE id = ?`;

  sqlite3.run(
    updateQuery,
    [newTutorial.title, newTutorial.description, newTutorial.published, id],
    (error) => {
      if (error) {
        return result(error, null);
      }
      return result(null, { id: id, ...newTutorial });
    }
  );
};

Tutorial.removeById = (id, result) => {
  let deletedTutorial;
  sqlite3.all(`SELECT * FROM tutorials WHERE id = ?`, [id], (error, row) => {
    deletedTutorial = row;
  });
  const removeQuery = `DELETE FROM tutorials WHERE id = ?`;
  sqlite3.run(removeQuery, [id], function (error) {
    if (error) {
      return result(error, null);
    }
    if (this.changes === 0) {
      return result({ kind: "not_found" }, null);
    }
    return result(null, { ...deletedTutorial[0] });
  });
};

Tutorial.removeAll = (result) => {
  const removeQuery = `DELETE FROM tutorials`;
  sqlite3.run(removeQuery, (error) => {
    if (error) {
      return result(error);
    }
    return result();
  });
};

module.exports = Tutorial;
