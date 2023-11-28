import type PhotosMongosooseRepository from "../repository/PhotosMongoseRepository";
import type { Request, Response } from "express";

class PhotosController {
  constructor(private readonly photosRepository: PhotosMongosooseRepository) {}

  public getPhotos = async (_req: Request, res: Response): Promise<void> => {
    const photos = await this.photosRepository.getRobots();

    res.status(200).json({ photos });
  };
}

export default PhotosController;
