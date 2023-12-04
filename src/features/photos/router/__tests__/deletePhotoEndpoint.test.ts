import request from "supertest";
import { app } from "../../../../server/app";
import "../../../../server/index";

describe("Given a Delete / photoId endpoint", () => {
  describe("When it receives a valid request", () => {
    test("Then it should respond with a status code 200 and an empty object", async () => {
      const expectedStatusCode = 200;
      const path = "/photos/656360dae627443259cf3ce4";

      const response = await request(app)
        .delete(path)
        .expect(expectedStatusCode);

      expect(response.body).toStrictEqual({});
    });
  });

  describe("When it receives a invalid request", () => {
    test("Then it should respon with a sttus 400 and athe error message: 'Error deleting this photograph'", async () => {
      const expectedStatusCode = 400;
      const expectedErrorMessage = "Error deleting this photograph";
      const invalidPath = "/photos/invalid";

      const response = await request(app)
        .delete(invalidPath)
        .expect(expectedStatusCode);

      expect(response.body).toHaveProperty("error", expectedErrorMessage);
    });
  });
});
