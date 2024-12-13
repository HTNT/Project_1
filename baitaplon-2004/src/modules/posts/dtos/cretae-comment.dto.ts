import { IsNotEmpty, MinLength } from "class-validator";


export default class CreateCommentDto {
    @IsNotEmpty() @MinLength(1)
    public text: string | undefined;
    @IsNotEmpty()
    public userId: string | undefined;
    @IsNotEmpty()
    public postId: string | undefined;
}