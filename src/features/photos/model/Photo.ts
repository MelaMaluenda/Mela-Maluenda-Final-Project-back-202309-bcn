import { Schema, model } from "mongoose";
import type { PhotosStructure } from "../repository/types";

const photoSchema = new Schema<PhotosStructure>({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
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
