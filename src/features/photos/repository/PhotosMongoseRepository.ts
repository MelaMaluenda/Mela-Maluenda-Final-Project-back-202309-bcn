import { Error } from "mongoose";
import Photo from "../model/Photo.js";
import type { PhotosData, PhotosRepository } from "./types.js";

class PhotosMongosooseRepository implements PhotosRepository {
  public async getPhotos(): Promise<PhotosData[]> {
    const photos = await Photo.find().limit(10);

    return photos;
  }

  public async deletePhoto(photoId: string): Promise<void> {
    try {
      await Photo.findByIdAndDelete(photoId);
    } catch (error) {
      throw new Error(
        "Error deleting this photograph" + (error as Error).message,
      );
    }
  }

  public async addPhoto(photo: PhotosData): Promise<PhotosData> {
    try {
      const newPhoto = await Photo.create(photo);
      return newPhoto;
    } catch (error) {
      throw new Error("Error adding a new photo" + (error as Error).message);
    }
  }
}

export default PhotosMongosooseRepository;
