import request from "supertest";
import "../../../../server/index";
import { app } from "../../../../server/app";
import type { PhotosStructure } from "../../repository/types";
import photosMock from "../../mock/photosMock";
import Photo from "../../model/Photo";

describe("Given a GET /photos/6563642be627443259cf3ce8 endpoint", () => {
  describe("When it receives a request with a valid id '6563642be627443259cf3ce8'", () => {
    test("Then it should respond with status 200 and 'Matt stuart' author", async () => {
      const path = "/photos/6563642be627443259cf3ce8";
      const expectedStatusCode = 200;
      const expectedAuthor = "Matt stuart";

      await Photo.create(photosMock[2]);

      const response = await request(app).get(path).expect(expectedStatusCode);

      const responseBody = response.body as { photo: PhotosStructure };

      expect(responseBody.photo).toHaveProperty("author", expectedAuthor);
    });
  });

  describe("When it eceives a request with an invalid id", () => {
    test("Then it should respond with a status code 400 and a 'Error findig the photo'", async () => {
      const errorPath = "/photos/987654321";
      const expectedStatusCode = 400;
      const expectedError = { error: "Error findig the photo" };

      const response = await request(app)
        .get(errorPath)
        .expect(expectedStatusCode);

      const responseBody = response.body as { error: PhotosStructure };

      expect(responseBody).toStrictEqual(expectedError);
    });
  });
});
