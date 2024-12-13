

export interface IPost {
    _id: string;
    user: string;
    text: string;
    name: string;
    avatar: string;
    image: string;
    likes: ILike[];
    comments: IComment[];
    shares: IShare[];
    date: Date;
    imageUrl: string;
}
// interface kiem soat kieu du lieu database
//dto kiem soat rq tu client 
export interface ILike {
    user: string;
    // date: Date;
}

export interface IComment {
    _id: string;
    user: string;
    text: string;
    name: string;
    avatar: string;
    date: Date;
}

export interface IShare {
    user: string;
}