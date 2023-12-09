import { Error } from "mongoose";
import Photo from "../model/Photo.js";
import type {
  PhotosStructure,
  PhotosRepository,
  PhotosStructureWithoutId,
} from "./types.js";

class PhotosMongosooseRepository implements PhotosRepository {
  public async getPhotos(): Promise<PhotosStructure[]> {
    const photos = await Photo.find().limit(10).sort({ _id: -1 });

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

  public async addPhoto(
    photo: PhotosStructureWithoutId,
  ): Promise<PhotosStructure> {
    try {
      const newPhoto = await Photo.create(photo);
      return newPhoto;
    } catch (error) {
      throw new Error("Error adding a new photo" + (error as Error).message);
    }
  }

  public async getPhotoById(photoId: string): Promise<PhotosStructure> {
    try {
      const photo = await Photo.findById(photoId);

      return photo!;
    } catch (error) {
      throw new Error("Error findig the photo" + (error as Error).message);
    }
  }
}

export default PhotosMongosooseRepository;
