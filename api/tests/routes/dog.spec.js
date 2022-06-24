/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Raza, conn } = require("../../src/db.js");

const agent = session(app);
const dog = {
  name: "Puggo",
  id: "ba3",
  height: { metric: "15-35" },
  weight: { metric: "20-35" },
  life_span: "8-12",
  image: { url: "https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg" },
};

describe("Dogs Routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() => Raza.sync({ force: true }).then(() => Raza.create(dog)));
  describe("GET /dogs", () => {
    it("should get 200", () => agent.get("/dogs").expect(200));
  });
});
