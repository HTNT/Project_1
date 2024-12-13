import { IsNotEmpty } from "class-validator";

export default class AddImageDto{
    @IsNotEmpty()
    public _id : string | undefined;
    // @IsNotEmpty()
    // public data : Buffer | undefined;
    constructor(_id: string|undefined){
        this._id=_id;
        // this.data= data;
    }
}