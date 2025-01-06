



export interface IProfile {
    _id: string;
    user: string;
    company: string;
    website: string;
    location: string;
    status: string;
    skills: string[];
    bio: string;
    experience: IExperience[];
    education: IEducation[];
    social: ISocial;
    followings: IFollow[];
    followers: IFollow[];
    friends: IFriend[];
    friend_requests: IFriend[];
    friend_wait_reponse: IFriend[];
    date: Date;
}

export interface IFollow {
    user:string;
    date: Date;
}
export interface IFriend{
    user:string;
    date: Date;
}
export interface IExperience {
    _id: string;
    company: string;
    title: string;
    location: string;
    from: Date;
    to: Date;
    current: boolean;
    description: string;
}

export interface IEducation {
    _id: string;
    school: string;
    degree: string;
    fieldofstudy: string;
    from: Date;
    to: Date;
    current: boolean;
    description: string;
}

export interface ISocial extends Record<string, string> {
    youtube: string;
    twitter: string;
    facebook: string;
    linkedin: string;
    instagram: string;
}





