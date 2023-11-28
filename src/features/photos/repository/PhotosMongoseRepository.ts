import Photo from "../model/Photo";
import type { PhotosData, PhotosRepository } from "../types";

class PhotosMongosooseRepository implements PhotosRepository {
  public async getRobots(): Promise<PhotosData[]> {
    const photos = await Photo.find();

    return photos;
  }
}

export default PhotosMongosooseRepository;
