const db = require("../db/connection");

exports.selectAllPhrases = async () => {
  const result = await db.query(`SELECT * FROM phrases;`);
  return result.rows;
};

exports.insertPhrase = async (newPhrase) => {
  const { id, english, thai } = newPhrase;
  if (!english || !thai) {
    return Promise.reject({
      status: 400,
      msg: "missing details - please complete all fields and resubmit",
    });
  }

  const queryStr = `INSERT INTO phrases (id, english, thai) VALUES ($1, $2, $3) RETURNING *;`;
  const queryVals = [id, english, thai];
  const result = await db.query(queryStr, queryVals);
  return result.rows[0];
};
