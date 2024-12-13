import mongoose from "mongoose";
import { IGroup } from "./group.interface";

const GroupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        
    },
    members: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user",
            },
            date:{
                type: Date,
                default: Date.now,
            }
        }
    ],
    member_requests: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user",
            },
            date:{
                type: Date,
                default: Date.now,
            }
        }
    ],
    managers: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user",
            },
            role:{
                type: String,
                enum: ["admin", "mod"],
                default: "admin",
            },
        }
    ],
    creator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        },
    date:   {
        type: Date,
        default: Date.now,
    }
});
export default mongoose.model<IGroup & mongoose.Document>('group',GroupSchema);