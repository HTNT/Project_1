import FileSchema from './file.model';
import IFile from './file.interface';
import AddFileDto from "./dtos/addfile.dto";
import HttpException from "@core/exceptions/http.exception";

export default class FileService {
    public fileSchema = FileSchema;

    public addFile = async (addFileDto: AddFileDto): Promise<IFile> => {
        const { file_name, data } = addFileDto;

        const newFile = new FileSchema({
            file_name,
            data,
        });

        const savedFile = await newFile.save();
        return savedFile;
    }

    public getFile = async (fileId: string): Promise<IFile> => {
        const file = await FileSchema.findById(fileId).exec();
        if (!file) {
            throw new HttpException(404, 'File not found');
        }
        return file;
    }

    public getAllFile = async (): Promise<IFile[]> => {
        return await FileSchema.find().exec();
    }
}
