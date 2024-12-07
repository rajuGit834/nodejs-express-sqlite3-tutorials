const Tutorial = require("../models/tutorial.model.js");

exports.createTutorial = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Content can not be empty!" });
  }
  const tutorial = new Tutorial(req.body);
  Tutorial.create(tutorial, (error, newTutorial) => {
    if (error) {
      return res
        .status(500)
        .send({ message: "Some error occured while creating the Tutorial", ...req.body });
    }
    return res.send({ message: `Tutorial is added Successfully`, ...newTutorial });
  });
};

exports.getOneTutorial = (req, res) => {
  const id = Number(req.params.id);
  if (id < 0) {
    res.status(404).send({ message: "Id Should be positive" });
  }
  Tutorial.findById(id, (error, row) => {
    if (error) {
      return res.status(500).send({
        message: "Some error occured while retrieving tutorial " + id,
        error: error.message,
      });
    }

    if (row.length) {
      return res.send(row);
    }
    return res.status(404).send({ message: "Id not found" });
  });
};

exports.getAllTutorial = (req, res) => {
  Tutorial.findAll((error, rows) => {
    if (error) {
      return res.status(500).send({
        message: "Something went wrong",
        error: error.message,
      });
    } else if (!rows.length) {
      return res.status(400).send({ message: "Tutorial is Empty" });
    }
    return res.send(rows);
  });
};

exports.getPublishedTut = (req, res) => {
  Tutorial.findPublishedTut((error, rows) => {
    if (error) {
      return res.status(500).send({
        message: "Something went wrong",
        error: error.message,
      });
    } else if (!rows.length) {
      return res
        .status(400)
        .send({ message: "No any Tutorial is Published yet!" });
    }
    return res.send(rows);
  });
};

exports.updateTutorial = (req, res) => {
  const id = Number(req.params.id);
  if (id < 0) {
    res.status(400).send({ message: "Id Should be positive" });
  }
  if (!req.body) {
    return res.status(400).send({ message: "Body can not be empty!" });
  }
  const tutorial = new Tutorial(req.body);
  Tutorial.updateById(id, tutorial, (error, updatedTutorial) => {
    if (error) {
      return res.status(500).send({
        message: "Something went wrong",
        error: error.message,
      });
    }
    return res.send({
      message: "Tutorial updated successfully.",
      ...updatedTutorial,
    });
  });
};

exports.removeOneTutorial = (req, res) => {
  const id = Number(req.params.id);
  if (id < 0) {
    res.status(400).send({ message: "Id Should be positive" });
  }
  Tutorial.removeById(id, (error, deletedTutorial) => {
    if (error) {
      if (error.kind === "not_found") {
        return res.status(400).send({ error: "Invalid Id" });
      }
      return res.status(500).send({
        message: "Something went wrong",
        error: error.message,
      });
    }

    return res.send({
      message: "Tutorial Deleted Successfully.",
      ...deletedTutorial,
    });
  });
};

exports.removeAllTutorial = (req, res) => {
  Tutorial.removeAll((error) => {
    if (error) {
      return res.status(500).send({
        message: "Something went wrong",
        error: error.message,
      });
    }
    return res.send({
      message: "All Tutorials are Deleted Successfully.",
    });
  });
};
