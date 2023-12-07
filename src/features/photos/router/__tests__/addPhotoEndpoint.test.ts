import request from "supertest";
import "../../../../setupTests";
import photoMock from "../../mock/photoMock";
import type { PhotosStructure } from "../../repository/types";
import { app } from "../../../../server/app";
import { server } from "../../../../setupTests";
import photoMockWithoutTitle from "../../mock/photoMockWithoutName";

describe("Given a POST /photos/add endpoint", () => {
  const path = "/photos/add";
  describe("When it receives a request with Ghost photo", () => {
    test("Then it should respond with a statusCode 201 and a new Ghost photo", async () => {
      const expectedStatusCode = 201;
      const expectedTitle = "Ghost";

      const response = await request(app)
        .post(path)
        .send(photoMock)
        .expect(expectedStatusCode);

      const responseBody = response.body as { photo: PhotosStructure };

      expect(responseBody.photo).toHaveProperty("title", expectedTitle);
    });
  });

  describe("When it receives a invalid request", () => {
    test("Then it should respond with a status 400 and an error message:'Error adding a new photo'", async () => {
      await server.stop();

      const expectedStatusCode = 400;
      const expectedError = { error: "Error adding a new photo" };

      const response = await request(app)
        .post(path)
        .send(photoMock)
        .expect(expectedStatusCode);

      const responseBody = response.body as { error: string };

      expect(responseBody).toStrictEqual(expectedError);
    });
  });

  describe("When it receives a new photo without a 'Ghost' title", () => {
    test("Then it should respond with a 'title is required' message inside the object error's property detail's body property", async () => {
      const expectedStatusCode = 400;
      const expectedError = "title is required";

      const response = await request(app)
        .post(path)
        .send(photoMockWithoutTitle)
        .expect(expectedStatusCode);

      const responseBody = response.body as { error: string };

      expect(responseBody).toHaveProperty("error", expectedError);
    });
  });
});
