const format = require("pg-format");
const db = require("../connection");
const uuid = require("uuid");

const seed = async ({ phrasesData }) => {
  await db.query(`DROP TABLE IF EXISTS phrases`);

  const phrasesTablePromise = db.query(`CREATE TABLE phrases (
    id uuid PRIMARY KEY,
    english VARCHAR NOT NULL,
    thai VARCHAR NOT NULL
);`);

  await phrasesTablePromise;

  const insertPhrasesQueryStr = format(
    `
    INSERT INTO phrases (id, english, thai) VALUES %L RETURNING *;

  `,
    phrasesData.map(({ english, thai }) => [uuid.v4(), english, thai])
  );

  const phrasesPromise = db
    .query(insertPhrasesQueryStr)
    .then((result) => result.rows);

  await phrasesPromise;
};

module.exports = seed;
