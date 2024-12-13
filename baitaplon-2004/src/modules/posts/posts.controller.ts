
import { Request, Response, NextFunction } from "express";
import { CreatePostDto, PostService } from ".";

export default class PostController {
    private postService = new PostService();

    public createPost = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user.id;
            const model: CreatePostDto = req.body;
            const result = await this.postService.createPost(userId, model);
            res.status(201).json({
                status: 201,
                message: 'Create post successful',
                result,
            })
        } catch (error) {
            next(error);
        }
    }

    public updatePost = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.params.id;
            const model: CreatePostDto = req.body;
            const result = await this.postService.updatePost(userId, model);
            res.status(200).json({
                status: 200,
                message: 'Uppdate post successful',
                result,
            })
        } catch (error) {
            next(error);
        }
    }

    public getAllPosts = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this.postService.getAllPost();
            res.status(200).json({
                status: 200,
                message: 'Get all post successful',
                result,
            })
        } catch (error) {
            next(error);
        }
    }

    public getPostById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const postId = req.params.id;
            const result = await this.postService.getPostById(postId);
            res.status(200).json({
                status: 200,
                message: 'Get post successful',
                result,
            })
        } catch (error) {
            next(error);
        }
    }

    public getPostByUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
                const userId = req.params.id;
                const result = await this.postService.getPostByUser(userId);
                res.status(200).json({
                    status: 200,
                    message: 'Get post successful',
                    result,
                })
        } catch (error) {
            next(error);
        }
    }


    public getAllPaging = async (req: Request, res: Response, next: NextFunction) => {
        const keyword: string = req.query.keyword?.toString() || '';
        const page: number = Number(req.params.page);
        try {
            const result = await this.postService.getAllPaging(keyword, page);
            res.status(200).json({
                status: 200,
                message: 'Get all paging post successful',
                result,
            })
        } catch (error) {
            next(error);
        }
    }

    public deletePost = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const postId = req.params.id;
            const userId = req.user.id;
            const result = await this.postService.deletePost(postId, userId);
            res.status(200).json({
                status: 200,
                message: 'Delete post successful',
                // result,
            })
        } catch (error) {
            next(error);
        }
    }

    public likePost = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const postId = req.params.id;
            const userId = req.user.id;
            const result = await this.postService.likePost(userId, postId);
            res.status(200).json({
                status: 200,
                message: 'Like post successful',
                result,
            })
        } catch (error) {
            next(error);
        }
    }

    public unLikePost = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const postId = req.params.id;
            const userId = req.user.id;
            const result = await this.postService.unLikePost(userId, postId);
            res.status(200).json({
                status: 200,
                message: 'Unlike post successful',
                result,
            })
        } catch (error) {
            next(error);
        }
    }

    public addComment = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const postId = req.params.id;
            const userId = req.user.id;
            const result = await this.postService.addComment({
                text: req.body.text,
                userId: userId,
                postId: postId
            });
            res.status(200).json({
                status: 200,
                message: 'Comment successful',
                result,
            })
        } catch (error) {
            next(error);
        }
    }

    public removeComment = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const postId = req.params.id;
            const commentId = req.params.comment_id;
            const userId = req.user.id;
            const result = await this.postService.removeComment(commentId, postId, userId);
            res.status(200).json({
                status: 200,
                message: 'Remove comment successful',
                result,
            })
        } catch (error) {
            next(error);
        }
    }

    public sharePost = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const postId = req.params.id;
            const userId = req.user.id;
            const result = await this.postService.sharePost(userId, postId);
            res.status(200).json({
                status: 200,
                message: 'Share post successful',
                result,
            })
        } catch (error) {
            next(error);
        }
    }

    public removeSharePost = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const postId = req.params.id;
            const userId = req.user.id;
            const result = await this.postService.removeSharePost(userId, postId);
            res.status(200).json({
                status: 200,
                message: 'Unlike post successful',
                result,
            })
        } catch (error) {
            next(error);
        }
    }
}

