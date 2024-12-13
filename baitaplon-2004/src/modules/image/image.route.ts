import { Route } from "@core/interfaces";
import { Router } from "express";
import ImageController from "./image.controller";
import { validationMiddleware } from "@core/middleware";
import AddImageDto from "./dtos/addimage.dto";
const multer  = require('multer');
const upload = multer({ dest: './images' })
export default class ImageRoute implements Route{
    public path: string = '/api/v1/images';
    public router: Router = Router();

    public imageController = new ImageController();
    constructor(){
        this.initializeRoute();
    }
    private initializeRoute(){
        this.router.post(this.path, validationMiddleware(AddImageDto, true), this.imageController.addImage);
        this.router.get(this.path +'/:id', this.imageController.getImage);
        this.router.get(this.path, this.imageController.getAllImage);
    }
}