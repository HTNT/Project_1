import { IsNotEmpty, isNotEmpty } from "class-validator";
export default class SendMessageDto {
    public conversationId: string | undefined;
    @IsNotEmpty()
    public to: string | undefined;
    @IsNotEmpty()
    public text: string | undefined;
    constructor(to: string | undefined, text: string | undefined){
        
        this.to = to;
        this.text = text;
    }
}
