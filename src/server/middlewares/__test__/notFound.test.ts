import request from "supertest";
import "../../../server/index";
import { app } from "../../app";

describe("Given a GET /phototest endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should response with a 404 abd a message 'Endpoint not found'", async () => {
      const expectedStatusCode = 404;
      const expectedMessage = "Endpoint not found";
      const requestedPath = "/phototest";

      const response = await request(app)
        .get(requestedPath)
        .expect(expectedStatusCode);

      expect(response.body).toHaveProperty("message", expectedMessage);
    });
  });
});
