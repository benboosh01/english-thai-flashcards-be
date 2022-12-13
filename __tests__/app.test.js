const testData = require("../db/data/test-data/index");
const seed = require("../db/seeds/seed");
const db = require("../db/connection");
const app = require("../app");
const request = require("supertest");
const { v4: uuidv4 } = require("uuid");

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
        expect(body.phrases.length).toBe(11);
      });
  });
});

describe("POST /api/phrases", () => {
  test("status 201: successfully adds phrase and responds with new phrase object", () => {
    const newPhrase = {
      id: uuidv4(),
      english: "money",
      thai_script: "ตังค์",
      thai_latin: "tang",
      category: "shopping",
    };
    return request(app)
      .post("/api/phrases")
      .send(newPhrase)
      .expect(201)
      .then(({ body }) => {
        expect(body.phrase).toEqual(newPhrase);
      });
  });
  test("status 400: responds with error when new phrase is missing information", () => {
    const newPhrase = {
      id: uuidv4(),
      english: "money",
      thai_script: "ตังค์",
      thai_latin: "tang",
      category: "",
    };
    return request(app)
      .post("/api/phrases")
      .send(newPhrase)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe(
          "missing details - please complete all fields and resubmit"
        );
      });
  });
});
