export type Category = "Long shot" | "Medium shot";

export interface PhotosData {
  _id: string;
  title: string;
  author: string;
  year: string;
  location: string;
  publicSpace: string;
  category: Category;
  portfolioUrl: string;
  whatMadeYouClick: string;
  photoUrl: string;
}

export interface PhotosRepository {
  getRobots: () => Promise<PhotosData[]>;
}
