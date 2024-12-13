import { IsNotEmpty, IsString } from "class-validator";

export default class AddFileDto {
    @IsString()
    public file_name: string | undefined;

    @IsNotEmpty()
    public data: Buffer | undefined;

    constructor(file_name: string | undefined, data: Buffer | undefined) {
        this.file_name = file_name;
        this.data = data;
    }
}
