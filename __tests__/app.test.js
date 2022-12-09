const testData = require("../db/data/test-data/index");
const seed = require("../db/seeds/seed");
const db = require("../db/connection");
const app = require("../app");
const request = require("supertest");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  return db.end();
});

describe("GET /api/phrases", () => {
  test("status 200: responds with array of objects correct length and keys", () => {
    return request(app)
      .get("/api/phrases")
      .expect(200)
      .then(({ body }) => {
        expect(body.phrases.length).toBe(9);
      });
  });
});

describe("POST /api/phrases", () => {
  test("status 201: successfully adds phrase and responds with new phrase object", () => {
    const newPhrase = {
      english: "money",
      thai: "ตังค์ (tang)",
    };
    return request(app)
      .post("/api/phrases")
      .send(newPhrase)
      .expect(201)
      .then(({ body }) => {
        expect(body.phrase).toEqual(newPhrase);
      });
  });
});
