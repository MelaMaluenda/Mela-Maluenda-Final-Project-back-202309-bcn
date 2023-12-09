import { type NextFunction, type Response } from "express";
import type { PhotosRequestWithoutId } from "../../repository/types";
import type PhotosMongosooseRepository from "../../repository/PhotosMongoseRepository";
import PhotosController from "../PhotosController";
import photoMock from "../../mock/photoMock";
import type CustomError from "../../../../server/CustomError/CustomError";

afterEach(() => {
  jest.clearAllMocks();
});

describe("Given a PhotosController addPhoto method", () => {
  describe("When it receives a request of a new add photo", () => {
    const req: Pick<PhotosRequestWithoutId, "body"> = {
      body: photoMock,
    };

    const res: Pick<Response, "status" | "json"> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next: NextFunction = jest.fn();
    const photosRepository: PhotosMongosooseRepository = {
      getPhotos: jest.fn(),
      deletePhoto: jest.fn(),
      addPhoto: jest.fn().mockResolvedValue({ photoMock }),
      getPhotoById: jest.fn(),
    };

    test("Then it should call its status method with code 201", async () => {
      const expectedStatusCode = 201;
      const photosController = new PhotosController(photosRepository);

      await photosController.addPhoto(
        req as PhotosRequestWithoutId,
        res as Response,
        next,
      );

      expect(res.status).toHaveBeenLastCalledWith(expectedStatusCode);
    });

    test("Then it should call its json method with Ghost photo object", async () => {
      const photosController = new PhotosController(photosRepository);

      await photosController.addPhoto(
        req as PhotosRequestWithoutId,
        res as Response,
        next,
      );

      expect(res.json).toHaveBeenCalledWith({ photo: { photoMock } });
    });

    test("Then if there's an error, it should call the status 400 and the message: 'Error adding a new photo'", async () => {
      const photosRepository: PhotosMongosooseRepository = {
        getPhotos: jest.fn(),
        deletePhoto: jest.fn(),
        addPhoto: jest.fn().mockRejectedValue(undefined),
        getPhotoById: jest.fn(),
      };

      const expectedError: Partial<CustomError> = {
        message: "Error adding a new photo",
        statusCode: 400,
      };

      const photosController = new PhotosController(photosRepository);

      await photosController.addPhoto(
        req as PhotosRequestWithoutId,
        res as Response,
        next,
      );

      expect(next).toHaveBeenCalledWith(expect.objectContaining(expectedError));
    });
  });
});
