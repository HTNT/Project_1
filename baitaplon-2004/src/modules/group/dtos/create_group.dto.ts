import { IsNotEmpty, isNotEmpty } from "class-validator";

export default class CreateGroupDto {
    @IsNotEmpty()
    public name: string | undefined;
    @IsNotEmpty()
    public code: string | undefined;
    
    public description: string | undefined;

    constructor(
        name: string | undefined,
        code: string | undefined,
        description: string | undefined
    ) {
        this.name = name;
        this.code = code;
        this.description = description;
    }
}