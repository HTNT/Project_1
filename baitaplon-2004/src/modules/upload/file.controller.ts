import { Request, Response, NextFunction } from "express";
import FileService from './file.service';
import AddFileDto from "./dtos/addfile.dto";

export default class FileController {
    private fileService = new FileService();

    public addFile = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const file_name = req.body.file_name;

            if (!req.file) {
                return res.status(400).json({
                    status: 400,
                    message: "No file uploaded",
                });
            }

            const fileBuffer = req.file.buffer;

            const addFileDto = new AddFileDto(file_name, fileBuffer);
            const result = await this.fileService.addFile(addFileDto);

            res.status(201).json({
                status: 201,
                message: "File uploaded successfully",
                result: {
                    fileUrl: `${req.protocol}://${req.get('host')}/api/v1/files/${result._id}`,
                    file_id: result._id,
                    file_name: result.file_name,
                }
            });
        } catch (err) {
            next(err);
        }
    }

    public getFile = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const fileId = req.params.id;

            const file = await this.fileService.getFile(fileId);

            res.set('Content-Type', 'image/jpeg');  // hoặc loại file phù hợp
            res.send(file.data);
        } catch (err) {
            next(err);
        }
    }

    public getAllFile = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this.fileService.getAllFile();
            res.status(200).json({
                status: 200,
                message: "Get all files successful",
                result
            });
        } catch (err) {
            next(err);
        }
    }
}
