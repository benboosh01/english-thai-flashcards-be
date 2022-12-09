const express = require("express");
const controllers = require("./controllers/thai-flashcard.controllers");

const app = express();

app.use(express.json());

app.get("/api/phrases", controllers.getAllPhrases);
app.post("/api/phrases", controllers.postPhrase);

module.exports = app;
