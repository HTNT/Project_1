import { IsOptional } from 'class-validator';
export default class AddEducationDto {
    @IsOptional() public school: string | undefined;
    @IsOptional() public degree: string | undefined;
    @IsOptional() public fieldofstudy: string | undefined;
    @IsOptional() public from: Date | undefined;
    @IsOptional() public to: Date | undefined;
    @IsOptional() public current: boolean | undefined;
    @IsOptional() public description: string | undefined;
}
