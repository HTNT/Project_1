import { IsOptional } from "class-validator";


export default class AddExperienceDto {
    @IsOptional() public company: string | undefined;
    @IsOptional() public title: string | undefined;
    @IsOptional() public location: string | undefined;
    @IsOptional() public from: Date | undefined;
    @IsOptional() public to: Date | undefined;
    @IsOptional() public current: boolean | undefined;
    @IsOptional() public description: string | undefined;
}