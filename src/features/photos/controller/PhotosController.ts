import type { Request, Response } from "express";
import type PhotosMongosooseRepository from "../repository/PhotosMongoseRepository.js";

class PhotosController {
  constructor(private readonly photosRepository: PhotosMongosooseRepository) {}

  public getPhotos = async (_req: Request, res: Response): Promise<void> => {
    const photos = await this.photosRepository.getPhotos();

    res.status(200).json({ photos });
  };
}

export default PhotosController;
