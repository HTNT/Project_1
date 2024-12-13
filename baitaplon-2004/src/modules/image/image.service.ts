import imageModel from "./image.model";
import IImage from './image.interface';
import ImageSchema from './image.model';

import HttpException from "@core/exceptions/http.exception";
import AddImageDto from "./dtos/addimage.dto";
export default class ImageService{
    public imageSchema = ImageSchema;

    public  addImage = async(imgId: string, imgBase64: string): Promise<IImage> => {
        const img = await ImageSchema.findById(imgId).exec();
        if(img){
            throw new HttpException(400, 'Image is exist');
        }
       
        const newimg = new ImageSchema({
           _id: imgId,
           data: imgBase64,
        })
        const image = await newimg.save();
        return image;
    }
    public getImage = async(imgId: string): Promise<IImage> =>{
        const img = await ImageSchema.findById(imgId);
        if(!img){
            throw new HttpException(400, 'Image Id not found');
        }
        return img;
    }
    public async getAllImage():Promise<IImage[]>{
        const imgs = ImageSchema.find().exec();
        return imgs;
    }

}