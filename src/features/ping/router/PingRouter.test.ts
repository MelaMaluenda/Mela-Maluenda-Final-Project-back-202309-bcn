import request from "supertest";
import "../../../setupTest";
import { app } from "../../../server/app";

describe("Given a GET / endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond it's method status 200 and a message 🏓", async () => {
      const expectedStatus = 200;
      const expectedMessage = "🏓";
      const path = "/";

      const response = await request(app).get(path).expect(expectedStatus);

      expect(response.body).toHaveProperty("message", expectedMessage);
    });
  });
});
