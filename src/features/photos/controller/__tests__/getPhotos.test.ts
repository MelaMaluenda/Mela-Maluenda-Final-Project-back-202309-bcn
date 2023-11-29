import photosMock from "../../mock/photosMock";
import type { PhotosRepository } from "../../repository/types";
import type { Request, Response } from "express";
import PhotosController from "../PhotosController";

describe("Given a PhotosController's getPhotos method", () => {
  describe("When it receives a response", () => {
    const photosRepository: Pick<PhotosRepository, "getPhotos"> = {
      getPhotos: jest.fn().mockReturnValue(photosMock),
    };

    const req = {};
    const res: Pick<Response, "status" | "json"> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnValue({ photos: photosMock }),
    };

    test("Then it should call it's method status with 200", async () => {
      const expectedStatusCode = 200;

      const photosController = new PhotosController(
        photosRepository as PhotosRepository,
      );

      await photosController.getPhotos(req as Request, res as Response);

      expect(res.status).toHaveBeenLastCalledWith(expectedStatusCode);
    });

    test("Then it should call it's method with Ghost, Urban angel, Deep thoughts", async () => {
      const expectedPhotos = photosMock;

      const photosController = new PhotosController(
        photosRepository as PhotosRepository,
      );

      await photosController.getPhotos(req as Request, res as Response);

      expect(res.json).toHaveBeenLastCalledWith({ photos: expectedPhotos });
    });
  });
});
