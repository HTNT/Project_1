
import {Request, Response, NextFunction} from "express";
import ImageService from './image.service';
import ImageRoute from "./image.route";
import AddImageDto from "./dtos/addimage.dto";
export default class ImageController{
    private imageService = new  ImageService();

    public addImage = async (req: Request, res: Response, next: NextFunction)=>{
        try{
            const imgId = req.params.id;
            const imgBase64 = req.body;
            
            const result= await this.imageService.addImage(imgId, imgBase64);
            res.status(201).json({
                status: 201,
                message: "new image successful",
                result
                
            })
        }catch(err){
            next(err);
        }
    }
    public getImage = async (req: Request, res: Response, next: NextFunction) =>{
        try{
            const imgId = req.params.id;
           
            const result= await this.imageService.getImage(imgId);
            res.status(201).json({
                status: 200,
                message: "get image successful",
                result
                
            })
        }catch(err){
            next(err);
        }
    }
    public getAllImage = async(req: Request, res: Response, next: NextFunction)=>{
        try{
            
            const result= await this.imageService.getAllImage();
            res.status(201).json({
                status: 201,
                message: "Get all successful",
                result        
            });
        }catch(err){
            next(err);
        }
    };
}
