import { type NextFunction, type Request, type Response } from "express";
import photoMock from "../../mock/photoMock";
import type PhotosMongosooseRepository from "../../repository/PhotosMongoseRepository";
import PhotosController from "../PhotosController";
import { type PhotoRequestById } from "../../repository/types";
import type CustomError from "../../../../server/CustomError/CustomError";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a PhotosController getPhotoById method", () => {
  const req: Pick<Request, "params"> = {
    params: { photoId: "6563642be627443259cf3ce8" },
  };

  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next: NextFunction = jest.fn();

  describe("When it receives a request with a photo id and a response", () => {
    const photosRepository: Pick<PhotosMongosooseRepository, "getPhotoById"> = {
      getPhotoById: jest.fn().mockResolvedValue(photoMock),
    };

    test("Then it should call it's response status method 200", async () => {
      const expectedStatusCode = 200;

      const photosController = new PhotosController(
        photosRepository as PhotosMongosooseRepository,
      );

      await photosController.getPhotoById(
        req as PhotoRequestById,
        res as Response,
        next,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("The it should call its method json with the 'Ghost' title", async () => {
      const photosController = new PhotosController(
        photosRepository as PhotosMongosooseRepository,
      );

      await photosController.getPhotoById(
        req as PhotoRequestById,
        res as Response,
        next,
      );

      expect(res.json).toHaveBeenCalledWith({ photo: photoMock });
    });
  });

  describe("When it receives a request with a photo id and an error appeared", () => {
    test("Then it should call its next function with a custom error: 'Error findig the photo'", async () => {
      const expectedStatusCode = 400;
      const expecedErrorMessage = "Error findig the photo";
      const expectedError: Pick<CustomError, "statusCode" | "message"> = {
        statusCode: expectedStatusCode,
        message: expecedErrorMessage,
      };

      const photosRepository: Pick<PhotosMongosooseRepository, "getPhotoById"> =
        {
          getPhotoById: jest.fn().mockRejectedValue(null),
        };

      const photosController = new PhotosController(
        photosRepository as PhotosMongosooseRepository,
      );

      await photosController.getPhotoById(
        req as PhotoRequestById,
        res as Response,
        next,
      );

      expect(next).toHaveBeenCalledWith(expect.objectContaining(expectedError));
    });
  });
});
