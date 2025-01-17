
import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';


export default class RegisterDto {
    @IsNotEmpty()
    public first_name: string;
    @IsNotEmpty()
    public last_name: string;
    @IsNotEmpty() @IsEmail()
    public email: string;
    @IsNotEmpty() @MinLength(8, { 'message': 'Password is short!' })
    public password: string;

    constructor(first_name: string, last_name: string, email: string, password: string) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
    }
}