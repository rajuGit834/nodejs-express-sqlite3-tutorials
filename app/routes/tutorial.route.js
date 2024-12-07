module.exports = (app) => {
  const tutorial = require("../controller/tutorial.controller.js");
  const router = require("express").Router();

  router
    .route("/")
    .get(tutorial.getAllTutorial)
    .post(tutorial.createTutorial)
    .delete(tutorial.removeAllTutorial);

  router.get("/published", tutorial.getPublishedTut);

  router
    .route("/:id")
    .get(tutorial.getOneTutorial)
    .put(tutorial.updateTutorial)
    .delete(tutorial.removeOneTutorial);

  app.use("/api/tutorial", router);

  app.use((req, res) => {
    res.status(404).send({
      error: "Not Found",
      method: req.method,
      message: `The URL '${req.originalUrl}' does not exits on this server`,
    });
  });
};
