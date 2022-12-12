const express = require("express");
const controllers = require("./controllers/thai-flashcard.controllers");
const errorControllers = require("./controllers/error-handling.controllers");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/phrases", controllers.getAllPhrases);
app.post("/api/phrases", controllers.postPhrase);

app.all("*", (req, res) => {
  res.status(404).send({ msg: "invalid URL" });
});

app.use(errorHandlers.customError);
app.use(errorHandlers.serverError);

module.exports = app;
