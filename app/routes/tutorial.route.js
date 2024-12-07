module.exports = (app) => {
  const tutorial = require("../controller/tutorial.controller.js");
  const router = require("express").Router();

  router.post("/", tutorial.createTutorial);

  router.get("/", tutorial.getAllTutorial);

  router.get("/published", tutorial.getPublishedTut);

  router.get("/:id", tutorial.getOneTutorial);

  router.put("/:id", tutorial.updateTutorial);

  router.delete("/:id", tutorial.removeOneTutorial);

  router.delete("/", tutorial.removeAllTutorial);

  app.use("/api/tutorial", router);

  app.use((req, res) => {
    res.status(404).send({
      error: "Not Found",
      method: req.method,
      message: `The URL '${req.originalUrl}' does not exits on this server`,
    });
  });
};
