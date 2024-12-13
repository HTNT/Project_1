import { IsOptional, MinLength } from "class-validator";


export default class CreatePostDto {
    @MinLength(1) public text: string | undefined;
    @IsOptional() public imageUrl: string | undefined;
    constructor(_text: string | undefined, _imageUrl: string) {
        this.text = _text;
        this.imageUrl = _imageUrl;
    }
}