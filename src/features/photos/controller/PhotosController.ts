import type { NextFunction, Request, Response } from "express";
import { type PhotosRepository } from "../repository/types.js";
import CustomError from "../../../server/CustomError/CustomError.js";

class PhotosController {
  constructor(private readonly photosRepository: PhotosRepository) {}

  public getPhotos = async (_req: Request, res: Response): Promise<void> => {
    const photos = await this.photosRepository.getPhotos();

    res.status(200).json({ photos });
  };

  public deletePhoto = async (
    req: Request<{ photoId: string }>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { photoId } = req.params;
    try {
      await this.photosRepository.deletePhoto(photoId);

      res.status(200).json({});
    } catch {
      const error = new CustomError("Error deleting this photograph", 400);
      next(error);
    }
  };
}

export default PhotosController;
