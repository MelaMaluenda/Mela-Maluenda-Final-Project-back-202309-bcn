import { Schema, model } from "mongoose";
import type { PhotosData } from "../repository/types";

const photoSchema = new Schema<PhotosData>({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  publicSpace: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  portfolioUrl: {
    type: String,
    required: true,
  },
  whatMadeYouClick: {
    type: String,
    required: true,
  },
  photoUrl: {
    type: String,
    required: true,
  },
});

const Photo = model("Photos", photoSchema, "contest");

export default Photo;
