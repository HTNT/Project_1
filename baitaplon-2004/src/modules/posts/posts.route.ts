import { Route } from '@core/interfaces';
import { Router } from "express"
import PostController from './posts.controller';
import { authMiddleware, validationMiddleware } from '@core/middleware';
import CreatePostDto from './dtos/create-post.dto';
import CreateCommentDto from './dtos/cretae-comment.dto';



export default class PostRoute implements Route {
    public path: string = '/api/v1/posts';
    public router: Router = Router();

    public postController = new PostController()

    constructor() {
        this.initializeRoute();
    }

    private initializeRoute() {
        this.router.post(this.path, authMiddleware, validationMiddleware(CreatePostDto, true), this.postController.createPost);
        this.router.put(this.path + '/:id', authMiddleware, validationMiddleware(CreatePostDto, true), this.postController.updatePost);
        this.router.get(this.path, authMiddleware, this.postController.getAllPosts);
        this.router.get(this.path + '/paging/:page', authMiddleware, this.postController.getAllPaging);
        this.router.get(this.path + '/:id', authMiddleware, this.postController.getPostById);
        this.router.delete(this.path + '/:id', authMiddleware, this.postController.deletePost);
        this.router.put(this.path + '/like/:id', authMiddleware, this.postController.likePost);
        this.router.put(this.path + '/unlike/:id', authMiddleware, this.postController.unLikePost);
        this.router.post(this.path + '/comment/:id', authMiddleware, validationMiddleware(CreateCommentDto, true), this.postController.addComment);
        this.router.delete(this.path + '/comment/:id/:comment_id', authMiddleware, this.postController.removeComment);
        this.router.post(this.path + '/share/:id', authMiddleware, this.postController.sharePost);
        this.router.delete(this.path + '/share/:id', authMiddleware, this.postController.removeSharePost);
        this.router.get(this.path + '/user/:id', this.postController.getPostByUser);
    }
}