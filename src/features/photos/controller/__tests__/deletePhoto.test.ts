import { type NextFunction, type Request, type Response } from "express";
import { type PhotosRepository } from "../../repository/types";
import PhotosController from "../PhotosController";

afterEach(() => {
  jest.clearAllMocks();
});

describe("Given a PhotosController deletePhoto method", () => {
  describe("When it receives a response", () => {
    const photosRepository: Pick<PhotosRepository, "deletePhoto"> = {
      deletePhoto: jest.fn().mockReturnValue({}),
    };

    const req: Pick<Request, "params"> = {
      params: { id: "65635f70e627443259cf3ce2" },
    };

    const res: Pick<Response, "status" | "json"> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockResolvedValue({}),
    };

    const next: NextFunction = jest.fn();

    test("Then it should call it method status with 200", async () => {
      const expectedStatus = 200;
      const photosController = new PhotosController(
        photosRepository as PhotosRepository,
      );

      await photosController.deletePhoto(
        req as Request<{ photoId: string }>,
        res as Response,
        next,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call it method json with an empty object", async () => {
      const expectedEmptyObject = {};

      const photosController = new PhotosController(
        photosRepository as PhotosRepository,
      );

      await photosController.deletePhoto(
        req as Request<{ photoId: string }>,
        res as Response,
        next,
      );

      expect(res.json).toHaveBeenCalledWith(expectedEmptyObject);
    });
  });
});
