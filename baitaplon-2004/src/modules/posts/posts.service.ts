import { UserSchema } from '@modules/users';
import CreatePostDto from "./dtos/create-post.dto";
import { IComment, ILike, IPost, IShare } from "./posts.interface";
import HttpException from '@core/exceptions/http.exception';
import { CreateCommentDto, PostSchema } from '.';
import { query } from 'express';
import { IPagintion } from '@core/interfaces';





export default class PostService {
    public createPost = async (userId: string, postDto: CreatePostDto): Promise<IPost> => {
        const user = await UserSchema.findById(userId).select('-password');
        if (!user) { throw new HttpException(404, 'User is not exists'); }

        const newPost = new PostSchema({
            text: postDto.text,
            imageUrl: postDto.imageUrl,
            name: user.first_name + ' ' + user.last_name,
            avatar: user.avatar,
            user: userId,
            // date: Date.now(),
        })

        const post = await newPost.save();
        return post;
    }

    public updatePost = async (postId: string, postDto: CreatePostDto): Promise<IPost> => {
        const updatePostById = await PostSchema.findByIdAndUpdate(postId, { ...postDto }, { new: true }).exec();
        if (!updatePostById) { throw new HttpException(404, 'Post is not found') };
        return updatePostById;
    }

    public getAllPost = async (): Promise<IPost[]> => {
        const posts = await PostSchema.find().sort({ date: -1 }).exec();
        if (!posts) { throw new HttpException(404, 'Post is not found') };
        return posts;
    }

    public getPostById = async (postId: string): Promise<IPost> => {
        const post = await PostSchema.findById(postId).exec();
        if (!post) { throw new HttpException(404, 'Post is not found') };
        return post;
    }

    public getPostByUser = async (userId: string): Promise<IPost[]> => {
        const posts = await PostSchema.find({ user: userId }).sort({ date: -1 }).exec();
        if (!posts || posts.length === 0) {
            throw new HttpException(404, 'No posts found for this user');
        }
        return posts;
    }

    public getAllPaging = async (keyword: string, page: number): Promise<IPagintion<IPost>> => {
        const pageSize = Number(process.env.PAGE_SIZE) || 10;
        const skip = (page - 1) * pageSize;


        // ===== include upercations and space
        const query = keyword ?
            {
                $or: [
                    { text: { $regex: RegExp('.*' + keyword + '.*', 'i') } },
                    { name: { $regex: RegExp('.*' + keyword + '.*', 'i') } },
                    { text: { $regex: RegExp('^' + keyword, 'i') } },
                    { name: { $regex: RegExp('^' + keyword, 'i') } },
                    { text: { $regex: RegExp(keyword + '^', 'i') } },
                    { name: { $regex: RegExp(keyword + '^', 'i') } },
                ]
            }
            : {};

        const rowCount = await PostSchema.find(query).countDocuments().exec();
        const posts = await PostSchema.find(query).skip(skip).limit(pageSize).exec();

        // const query =
        //     keyword ?
        //         { $or: [{ text: keyword }] }
        //         : {};

        // const posts = await PostSchema.find(query).skip(skip).limit(pageSize).exec();
        // const rowCount = await PostSchema.find(query).countDocuments().exec();

        return {
            total: rowCount,
            page: page,
            pageSize: pageSize,
            item: posts
        } as IPagintion<IPost>
    }

    public deletePost = async (postId: string, userId: string): Promise<IPost> => {
        const post = await PostSchema.findById(postId).exec();
        if (!post) { throw new HttpException(404, 'Post is not found') };
        if (post.user.toString() !== userId.toString()) { throw new HttpException(404, 'You are not authorized !') };
        const deletePostById = await PostSchema.findByIdAndDelete(postId, { new: true }).exec();
        if (!deletePostById) { throw new HttpException(404, 'Post is not found') };
        return deletePostById;
    }

    public likePost = async (userId: string, postId: string): Promise<ILike[]> => {
        const post = await PostSchema.findById(postId).exec();
        if (!post) { throw new HttpException(404, 'Post is not found') };
        if (post.likes.some((likes: ILike) => likes.user.toString() === likes.user)) {
            throw new HttpException(400, 'Post already likes');
        }
        post.likes.unshift({ user: userId });
        await post.save();
        return post.likes;
    }

    public unLikePost = async (userId: string, postId: string): Promise<ILike[]> => {
        const post = await PostSchema.findById(postId).exec();
        if (!post) { throw new HttpException(404, 'Post is not found') };
        if (post.likes.some((likes: ILike) => likes.user.toString() === likes.user)) {
            throw new HttpException(400, 'Post has not been liked');
        }
        post.likes = post.likes.filter(({ user }) => user.toString() !== userId);
        await post.save();
        return post.likes;
    }

    public addComment = async (comment: CreateCommentDto): Promise<IComment[]> => {
        const post = await PostSchema.findById(comment.postId).exec();
        if (!post) { throw new HttpException(404, 'Post is not found') };

        const user = await UserSchema.findById(comment.userId).select('-password').exec();
        if (!user) { throw new HttpException(404, 'User is not found') };

        const newCmt = {
            text: comment.text,
            name: user.first_name + ' ' + user.last_name,
            avatar: user.avatar,
            user: comment.userId,
        }

        post.comments.unshift(newCmt as IComment);
        await post.save();
        return post.comments;
    }

    public removeComment = async (commentId: string, postId: string, userId: string): Promise<IComment[]> => {
        const post = await PostSchema.findById(postId).exec();
        if (!post) { throw new HttpException(404, 'Post is not found') };

        const cmt = post.comments.find(c => c._id.toString() === commentId.toString());
        if (!cmt) { throw new HttpException(400, 'Comments not found') };
        if (cmt.user.toString() !== userId) { throw new HttpException(404, 'you are not authorized '); }

        post.comments = post.comments.filter(({ _id }) => _id.toString() !== commentId.toString());
        await post.save();
        return post.comments;
    }

    public sharePost = async (userId: string, postId: string): Promise<IShare[]> => {
        const post = await PostSchema.findById(postId).exec();
        if (!post) { throw new HttpException(404, 'Post is not found') };
        if (post.shares && post.shares.some((share: IShare) => share.user.toString() === share.user)) {
            throw new HttpException(400, 'Post already share');
        }

        if (post.shares && post.shares.length === 0) { post.shares = []; }
        post.shares.unshift({ user: userId });
        await post.save();
        return post.shares;
    }

    public removeSharePost = async (userId: string, postId: string): Promise<IShare[]> => {
        const post = await PostSchema.findById(postId).exec();
        if (!post) { throw new HttpException(404, 'Post is not found') };
        if (post.shares && post.shares.some((share: ILike) => share.user.toString() === share.user)) {
            throw new HttpException(400, 'Post has not been shared');
        }
        Array.isArray(post.shares) ? post.shares = post.shares.filter(({ user }) => user.toString() !== userId) : post.shares = [];
        await post.save();
        return post.shares;
    }

}