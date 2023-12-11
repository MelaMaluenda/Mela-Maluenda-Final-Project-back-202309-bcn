import request from "supertest";
import "../../../../setupTests";
import { app } from "../../../../server/app";
import Photo from "../../model/Photo";
import modifiedPhotoMock from "../../mock/modifiedPhotoMock";
import { type PhotosStructure } from "../../repository/types";

describe("Given a PATCH /photos/65635f70e627443259cf3ce2 endpoint", () => {
  describe("When it receives a request with a valid id", () => {
    test("Then it should respond with a status code 200 and the location modified", async () => {
      const path = "/photos/65635f70e627443259cf3ce2";
      const expectedStatusCode = 200;
      const expectedModifiedLocation = "Greece";

      await Photo.create(modifiedPhotoMock);

      const response = await request(app)
        .patch(path)
        .expect(expectedStatusCode);

      const responseBody = response.body as { photo: PhotosStructure };

      expect(responseBody.photo).toHaveProperty(
        "location",
        expectedModifiedLocation,
      );
    });
  });

  describe("When it receives a request with an invalid id", () => {
    test("Then it should respond with a status code 400 and a message: 'Error to modify data photo'", async () => {
      const path = "/photos/0987654321";
      const expectedStatusCode = 400;
      const expectedErrorMessage = { error: "Error to modify data photo" };

      const response = await request(app)
        .patch(path)
        .expect(expectedStatusCode);

      const responseBody = response.body as { error: PhotosStructure };

      expect(responseBody).toStrictEqual(expectedErrorMessage);
    });
  });
});
