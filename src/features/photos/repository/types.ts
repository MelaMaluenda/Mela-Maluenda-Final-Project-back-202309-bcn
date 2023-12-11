import type { Request } from "express";

export type Category = "Long shot" | "Medium shot";

export interface PhotosStructure {
  _id: string;
  title: string;
  author: string;
  year: number;
  location: string;
  publicSpace: string;
  category: Category;
  portfolioUrl: string;
  whatMadeYouClick: string;
  photoUrl: string;
}

export type PhotosStructureWithoutId = Omit<PhotosStructure, "_id">;

export type PhotosStructureWithoutTitle = Omit<
  PhotosStructure,
  "_id" | "title"
>;

export type PhotosRequestWithoutId = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  PhotosStructureWithoutId
>;

export type PhotoRequestWithId = Request<
  { photoId: string },
  Record<string, unknown>,
  PhotosStructure
>;

export type PhotoRequestById = Request<{ photoId: string }>;

export interface PhotosRepository {
  getPhotos: () => Promise<PhotosStructure[]>;
  deletePhoto: (photoId: string) => Promise<void>;
  addPhoto: (photo: PhotosStructureWithoutId) => Promise<PhotosStructure>;
  getPhotoById: (id: string) => Promise<PhotosStructure>;
  modifyPhoto: (
    id: string,
    photo: PhotosStructure,
  ) => Promise<PhotosStructure | undefined>;
}
