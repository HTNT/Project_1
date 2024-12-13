import mongoose from "mongoose";
import IImage from "./image.interface";

const ImageSchema = new mongoose.Schema({
    _id:{
        type: String,
        require: true,
    },
    data:{
        type: Buffer,
        require: true,
    },
})
export default mongoose.model<IImage & mongoose.Document>('image', ImageSchema);