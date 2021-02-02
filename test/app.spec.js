const app = require("../src/app");
const helpers = require("./test-helpers");

describe("App", () => {
  it('GET / responds with 200 containing "Hello, world!"', () => {
    return supertest(app)
      .get("/")
      .set("Authorization", helpers.makeAuthHeader())
      .expect(200, "Hello, world!");
  });
});
