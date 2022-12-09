const models = require("../models/thai-flashcard.models");

exports.getAllPhrases = (req, res, next) => {
  models
    .selectAllPhrases()
    .then((phrases) => {
      res.status(200).send({ phrases });
    })
    .catch((error) => {
      next(error);
    });
};

exports.postPhrase = (req, res, next) => {
  const newPhrase = req.body;
  models
    .insertPhrase(newPhrase)
    .then((phrase) => {
      res.status(201).send({ phrase });
    })
    .catch((error) => {
      next(error);
    });
};
