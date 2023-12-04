import { Router } from "express";
import PhotosMongosooseRepository from "../repository/PhotosMongoseRepository.js";
import PhotosController from "../controller/PhotosController.js";

const photoRouter = Router();

const photoRepository = new PhotosMongosooseRepository();
const photoController = new PhotosController(photoRepository);

photoRouter.get("/", photoController.getPhotos);

photoRouter.delete("/:photoId", photoController.deletePhoto);

export default photoRouter;
