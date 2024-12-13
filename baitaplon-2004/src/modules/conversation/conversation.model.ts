import mongoose, {Document} from "mongoose"
import { IConversation } from "./conversation.interface";

const ConversationSchema = new mongoose.Schema({
    user1:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    user2:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
    },
    recent_date:{
        type: Date,
        default: Date.now,
    },
    messages:[{
        from:{
            type: mongoose.Schema.Types.ObjectId,
            required: false
        },
        to:{
            type: mongoose.Schema.Types.ObjectId,
            required: false
        },
        read:{
            type: Boolean,
            default: false
        },
        text:{
            type: String,
            required: false
        },
        date:{
            type: Date,
            default: Date.now,
        },
        show_on_from:{
            type: Boolean,
            default: true
        },
        show_on_to:{
            type: Boolean,
            default: true
        }
        
    }]
});
export default mongoose.model<IConversation & Document>('conversation', ConversationSchema);