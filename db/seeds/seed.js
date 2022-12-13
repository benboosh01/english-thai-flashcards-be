const format = require("pg-format");
const db = require("../connection");
const uuid = require("uuid");

const seed = async ({ phrasesData }) => {
  await db.query(`DROP TABLE IF EXISTS phrases`);

  const phrasesTablePromise = db.query(`CREATE TABLE phrases (
    id uuid PRIMARY KEY,
    english VARCHAR NOT NULL,
    thai_script VARCHAR NOT NULL,
    thai_latin VARCHAR NOT NULL,
    category VARCHAR NOT NULL
);`);

  await phrasesTablePromise;

  const insertPhrasesQueryStr = format(
    `
    INSERT INTO phrases (id, english, thai_script, thai_latin, category) VALUES %L RETURNING *;
  `,
    phrasesData.map(({ english, thai_script, thai_latin, category }) => [
      uuid.v4(),
      english,
      thai_script,
      thai_latin,
      category,
    ])
  );

  const phrasesPromise = db
    .query(insertPhrasesQueryStr)
    .then((result) => result.rows);

  await phrasesPromise;
};

module.exports = seed;
