import photosMock from "../../mock/photosMock";
import modifiedPhotoMock from "../../mock/modifiedPhotoMock";
import PhotosController from "../PhotosController";
import type { NextFunction, Response } from "express";
import type { PhotoRequestWithId } from "../../repository/types";
import type PhotosMongosooseRepository from "../../repository/PhotosMongoseRepository";
import type CustomError from "../../../../server/CustomError/CustomError";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a PhotosController modifyPhoto method", () => {
  const req: Pick<PhotoRequestWithId, "body" | "params"> = {
    body: photosMock[0],
    params: { photoId: "65635f70e627443259cf3ce2" },
  };

  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next: NextFunction = jest.fn();

  describe("When it receives a request with a photo id", () => {
    const photosRepository: Pick<PhotosMongosooseRepository, "modifyPhoto"> = {
      modifyPhoto: jest.fn().mockResolvedValue(modifiedPhotoMock),
    };

    test("Then it should call the status code with a 200", async () => {
      const expectedStatusCode = 200;

      const photosController = new PhotosController(
        photosRepository as PhotosMongosooseRepository,
      );

      await photosController.modifyPhoto(
        req as PhotoRequestWithId,
        res as Response,
        next,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the response json with the photo id modified", async () => {
      const photosController = new PhotosController(
        photosRepository as PhotosMongosooseRepository,
      );

      await photosController.modifyPhoto(
        req as PhotoRequestWithId,
        res as Response,
        next,
      );

      expect(res.json).toHaveBeenCalledWith({ photo: modifiedPhotoMock });
    });

    test("Then if there's an error, it should call the status 400 and the message: 'Error to modify data photo'", async () => {
      const expectedStatusCode = 400;
      const expectedErrorMessage = "Error to modify data photo";
      const expectedError: Pick<CustomError, "statusCode" | "message"> = {
        statusCode: expectedStatusCode,
        message: expectedErrorMessage,
      };

      const photosRepository: Pick<PhotosMongosooseRepository, "modifyPhoto"> =
        {
          modifyPhoto: jest.fn().mockRejectedValue(null),
        };

      const photosController = new PhotosController(
        photosRepository as PhotosMongosooseRepository,
      );

      await photosController.modifyPhoto(
        req as PhotoRequestWithId,
        res as Response,
        next,
      );

      expect(next).toHaveBeenCalledWith(expect.objectContaining(expectedError));
    });
  });
});
