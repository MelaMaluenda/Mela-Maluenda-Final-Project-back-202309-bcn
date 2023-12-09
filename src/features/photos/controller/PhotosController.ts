import type { NextFunction, Request, Response } from "express";
import {
  type PhotosRequestWithoutId,
  type PhotosRepository,
} from "../repository/types.js";
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

  public addPhoto = async (
    req: PhotosRequestWithoutId,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const photo = req.body;

      const photoWithoutId = await this.photosRepository.addPhoto(photo);
      res.status(201).json({ photo: photoWithoutId });
    } catch {
      const error = new CustomError("Error adding a new photo", 400);

      next(error);
    }
  };

  public getPhotoById = async (
    req: Request<{ photoId: string }>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { photoId } = req.params;

      const photo = await this.photosRepository.getPhotoById(photoId);
      res.status(200).json({ photo });
    } catch {
      const customError = new CustomError("Error findig the photo", 400);

      next(customError);
    }
  };
}

export default PhotosController;
