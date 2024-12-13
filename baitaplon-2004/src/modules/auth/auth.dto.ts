
import { IsNotEmpty, IsEmail, MinLength, isEmail } from 'class-validator';


export default class LoginDto {
    @IsNotEmpty() @IsEmail() 
    public email: string;
    @IsNotEmpty() @MinLength(6, { 'message': 'Password is short!' })
    public password: string;

    constructor( email: string, password: string) {
        this.email = email;
        this.password = password;
    }
}