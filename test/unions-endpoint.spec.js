const supertest = require("supertest");
const app = require("../src/app");
const helpers = require("./test-helpers");

describe.only("Unions endpoints", () => {
  let db;

  const testIndustries = helpers.makeIndustriesArray();
  const testUnions = helpers.makeUnionsArray();

  before("make knex instance", () => {
    db = helpers.makeKnexInstance();
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  before("cleanup", () => helpers.cleanTables(db));

  afterEach("cleanup", () => helpers.cleanTables(db));

  describe("GET /api/unions", () => {
    beforeEach("insert industries", () => {
      return helpers.seedIndustries(db, testIndustries);
    });

    beforeEach("insert unions", () => {
      return helpers.seedUnions(db, testUnions);
    });

    context("without search", () => {
      it("returns array of unions", () => {
        const unions = testUnions;

        const expectedResults = {
          unions,
          pageCount: 1,
          count: 3,
        };

        return supertest(app)
          .get("/api/unions/?page=1")
          .set("Authorization", helpers.makeAuthHeader())
          .expect(200)
          .expect(expectedResults);
      });
    });

    context("with search", () => {
      it("returns array of unions matching search", () => {
        let unions = [testUnions[0], testUnions[2]];

        const expectedResults = {
          unions,
          pageCount: 1,
          count: 2,
        };

        return supertest(app)
          .get("/api/unions/?page=1&q=app")
          .set("Authorization", helpers.makeAuthHeader())
          .expect(200)
          .expect(expectedResults);
      });
    });
  });

  describe("GET /api/unions/industry", () => {
    beforeEach("insert industries", () => {
      return helpers.seedIndustries(db, testIndustries);
    });

    beforeEach("insert unions", () => {
      return helpers.seedUnions(db, testUnions);
    });

    context("without search", () => {
      it("returns array of unions filtered by industry", () => {
        let unions = [testUnions[0], testUnions[1]];

        expectedResults = {
          unions,
          pageCount: 1,
          count: 2,
        };

        return supertest(app)
          .get("/api/unions/industry/?page=1&industry=Industry%201")
          .set("Authorization", helpers.makeAuthHeader())
          .expect(200)
          .expect(expectedResults);
      });
    });

    context("with search", () => {
      it("returns array of unions filtered by industry and search term", () => {
        let unions = [testUnions[0]];

        const expectedResults = {
          unions,
          pageCount: 1,
          count: 1,
        };

        return supertest(app)
          .get("/api/unions/industry/?page=1&industry=Industry%201&q=app")
          .set("Authorization", helpers.makeAuthHeader())
          .expect(200)
          .expect(expectedResults);
      });
    });
  });

  describe("GET /api/unions/:unionId", () => {
    beforeEach("insert industries", () => {
      return helpers.seedIndustries(db, testIndustries);
    });

    beforeEach("insert unions", () => {
      return helpers.seedUnions(db, testUnions);
    });

    it("returns union that matches unionId", () => {
      const expectedResult = testUnions[0];

      return supertest(app)
        .get("/api/unions/1")
        .set("Authorization", helpers.makeAuthHeader())
        .expect(200)
        .expect(expectedResult);
    });
  });
});
