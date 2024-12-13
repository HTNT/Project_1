import { IsNotEmpty, isNotEmpty } from "class-validator";

export default class SetManagerDto{
    @IsNotEmpty()
    public user: string | undefined;
    @IsNotEmpty()
    public role: string | undefined;
    constructor(user: string | undefined, role: string | undefined){
        this.user = user;
        this.role = role;
    }
}