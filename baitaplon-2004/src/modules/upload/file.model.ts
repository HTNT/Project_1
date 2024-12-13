import mongoose from "mongoose";
import IFile from "./file.interface";

const FileSchema = new mongoose.Schema({
    file_name: {
        type: String,
        required: true,
    },
    data: {
        type: Buffer,
        required: true,
    },
});

export default mongoose.model<IFile & mongoose.Document>('file', FileSchema);
