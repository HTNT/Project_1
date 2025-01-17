import mongoose from 'mongoose';
import { IProfile } from './profile.interface';



const ProfileSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        company: {
            type: String,
        },
        website: {
            type: String,
        },
        location: {
            type: String,
        },
        status: {
            type: String,
            required: true,
        },
        skills: {
            type: [String],
            required: true,
        },
        bio: {
            type: String,
        },
        experience: [
            {
                title: {
                    type: String,
                    required: true,
                },
                company: {
                    type: String,
                    required: true,
                },
                location: {
                    type: String,
                    // required:true,
                },
                from: {
                    type: Date,
                    // required: true,
                },
                to: {
                    type: Date,
                    // required:true,
                },
                current: {
                    type: Boolean,
                    default: false,
                },
                description: {
                    type: String,
                },
            }
        ],
        education: [
            {
                school: {
                    type: String,
                    required: true,
                },
                degree: {
                    type: String,
                    required: true,
                },
                fieldofstudy: {
                    type: String,
                    required: true,
                },
                from: {
                    type: Date,
                    required: true,
                },
                to: {
                    type: Date,
                    // required:true,
                },
                current: {
                    type: Boolean,
                    default: false,
                },
                description: {
                    type: String,
                },
            }
        ],
        social: {
            youtube: {
                type: String,
            },
            twitter: {
                type: String,
            },
            facebook: {
                type: String,
            },
            linkedin: {
                type: String,
            },
            instagram: {
                type: String,
            },
        },
        followings: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'user',
                },
                date: {
                    type: Date,
                    default: Date.now,
                },
                // status: {
                //     type: Boolean,
                //     default: false,
                // },
            }
        ],
        followers: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'user',
                },
                date: {
                    type: Date,
                    default: Date.now,
                },
                // status: {
                //     type: Boolean,
                //     default: false,
                // },
            }
        ],
        friends: [
            {
                user:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'user',
                },
                friend_date:{
                    type: Date,
                    default: Date.now,
                },
            }
        ],
        friend_requests: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'user',
                },
                requestDate: {
                    type: Date,
                    default: Date.now,
                },
                
            }
        ],
        friend_wait_reponse:[
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'user',
                },
                requestDate: {
                    type: Date,
                    default: Date.now,
                },
            }
        ],
        date: {
            type: Date,
            default: Date.now,
        },
    }
)


export default mongoose.model<IProfile & mongoose.Document>('profile', ProfileSchema);

