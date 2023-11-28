import request from "supertest";
import "../../../../setupTest";
import Photo from "../../model/Photo";
import photosMock from "../../mock/photosMock";
import { app } from "../../../../server/app";
import type { PhotosData } from "../../types";

describe("Given GET /contest endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with a status 200 and a list o photos: « Ghost », « Urban angel », « Deep thoughts »", async () => {
      const expectedStatus = 200;
      const photosPath = "/photos";

      await Photo.create(photosMock[0]);
      await Photo.create(photosMock[1]);
      await Photo.create(photosMock[2]);

      const response = await request(app)
        .get(photosPath)
        .expect(expectedStatus);

      const responseBody = response.body as { photos: PhotosData[] };

      responseBody.photos.forEach((photo, photoPosition) => {
        expect(photo).toHaveProperty("title", photosMock[photoPosition].title);
      });
    });
  });
});
