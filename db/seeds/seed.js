const format = require("pg-format");
const db = require("../connection");

const seed = async ({ phrasesData }) => {
  await db.query(`DROP TABLE IF EXISTS phrases`);

  const phrasesTablePromise = db.query(`CREATE TABLE phrases (
    english VARCHAR,
    thai VARCHAR
);`);

  await phrasesTablePromise;

  const insertPhrasesQueryStr = format(
    `
    INSERT INTO phrases (english, thai) VALUES %L RETURNING *;

  `,
    phrasesData.map(({ english, thai }) => [english, thai])
  );

  const phrasesPromise = db
    .query(insertPhrasesQueryStr)
    .then((result) => result.rows);

  await phrasesPromise;
};

module.exports = seed;
