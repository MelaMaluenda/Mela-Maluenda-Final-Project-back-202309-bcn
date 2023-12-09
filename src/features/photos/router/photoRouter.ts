import { Router } from "express";
import PhotosMongosooseRepository from "../repository/PhotosMongoseRepository.js";
import PhotosController from "../controller/PhotosController.js";
import photoValidation from "../schema/photoSchema.js";

const photoRouter = Router();

const photoRepository = new PhotosMongosooseRepository();
const photoController = new PhotosController(photoRepository);

photoRouter.get("/", photoController.getPhotos);

photoRouter.delete("/:photoId", photoController.deletePhoto);

photoRouter.post("/add", photoValidation, photoController.addPhoto);

photoRouter.get("/:photoId", photoController.getPhotoById);

export default photoRouter;
