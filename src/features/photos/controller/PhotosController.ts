import type { Request, Response } from "express";
import { type PhotosRepository } from "../repository/types.js";

class PhotosController {
  constructor(private readonly photosRepository: PhotosRepository) {}

  public getPhotos = async (_req: Request, res: Response): Promise<void> => {
    const photos = await this.photosRepository.getPhotos();

    res.status(200).json({ photos });
  };
}

export default PhotosController;
