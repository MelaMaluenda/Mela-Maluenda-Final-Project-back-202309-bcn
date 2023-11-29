import Photo from "../model/Photo.js";
import type { PhotosData, PhotosRepository } from "./types.js";

class PhotosMongosooseRepository implements PhotosRepository {
  public async getPhotos(): Promise<PhotosData[]> {
    const photos = await Photo.find().limit(10);

    return photos;
  }
}

export default PhotosMongosooseRepository;
