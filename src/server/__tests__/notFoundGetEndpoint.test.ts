import request from "supertest";
import { app } from "../app";
import "../../setupTests";

describe("Given a GET /photopath endpoint", () => {
  describe("When it received a request", () => {
    test("Then it should response with a 404 abd a message 'Endpoint not found'", async () => {
      const expectedStatus = 404;
      const expectedMessage = "Endpoint not found";
      const requestedPath = "/photopath";

      const response = await request(app)
        .get(requestedPath)
        .expect(expectedStatus);

      expect(response.body).toHaveProperty("error", expectedMessage);
    });
  });
});
