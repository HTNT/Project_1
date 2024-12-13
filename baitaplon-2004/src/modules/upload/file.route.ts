import { Route } from "@core/interfaces";
import { Router } from "express";
import FileController from "./file.controller";
import { validationMiddleware } from "@core/middleware";
import AddFileDto from "./dtos/addfile.dto";
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

export default class FileRoute implements Route {
    public path: string = '/api/v1/files';
    public router: Router = Router();

    private fileController = new FileController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(
            this.path,
            upload.single('file'),
            validationMiddleware(AddFileDto, true),
            this.fileController.addFile
        );
        this.router.get(this.path + '/:id', this.fileController.getFile);
        this.router.get(this.path, this.fileController.getAllFile);
    }
}
