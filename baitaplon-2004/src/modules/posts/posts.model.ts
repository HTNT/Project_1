import mongoose from "mongoose";
import { IPost } from "./posts.interface";

// dinh nghia kieu du lieu database
const PostSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', // referenc: tham chieu den bang user
    },
    text: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        // required: true,
    },
    avatar: {
        type: String,
        // required: true,
    },
    image: {
        type: String,
    },
    imageUrl: {
        type: String,
    },
    likes: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            // ref: 'user',
        },
    }],
    comments: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            // ref: 'user',
        },
        text: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            // required: true,
        },
        avatar: {
            type: String,
            // required: true,
        },
        date: {
            type: Date,
            default: Date.now,
        }
    }],
    shares: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
            },
        },
    ],
    date: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model<IPost & mongoose.Document>('post', PostSchema)
