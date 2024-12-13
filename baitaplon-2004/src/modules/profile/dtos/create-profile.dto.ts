import { IsOptional } from 'class-validator';


export default class CreateProfileDto {
    @IsOptional() public company: string;
    @IsOptional() public location: string;
    @IsOptional() public website: string;
    @IsOptional() public bio: string;
    @IsOptional() public skills: string;
    @IsOptional() public status: string;
    @IsOptional() public youtube: string;
    @IsOptional() public twitter: string;
    @IsOptional() public instagram: string;
    @IsOptional() public linkedin: string;
    @IsOptional() public facebook: string;

    constructor(company: string, location: string, website: string, bio: string, skills: string, status: string, youtube: string, twitter: string, instagram: string, linkedin: string, facebook: string) {
        this.company = company;
        this.location = location;
        this.website = website;
        this.bio = bio;
        this.skills = skills;
        this.status = status;
        this.youtube = youtube;
        this.twitter = twitter;
        this.instagram = instagram;
        this.linkedin = linkedin;
        this.facebook = facebook;
    }
}