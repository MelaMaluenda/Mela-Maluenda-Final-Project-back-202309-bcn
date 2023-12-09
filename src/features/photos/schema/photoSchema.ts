import { Joi, validate } from "express-validation";
import type { PhotosStructureWithoutId } from "../repository/types";

const photoSchema = {
  body: Joi.object<PhotosStructureWithoutId>({
    title: Joi.string().required(),
    author: Joi.string().required(),
    year: Joi.number().required(),
    location: Joi.string().required(),
    publicSpace: Joi.string().required(),
    category: Joi.string().required(),
    portfolioUrl: Joi.string().required(),
    whatMadeYouClick: Joi.string().required(),
    photoUrl: Joi.string().required(),
  }),
};

const photoValidation = validate(photoSchema, {}, { abortEarly: false });

export default photoValidation;
