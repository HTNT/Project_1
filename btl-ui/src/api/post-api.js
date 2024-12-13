import { axiosClient, baseURL } from "./axios-client";

const postAPI = {

    getAllPosts(token) {
        // console.log(baseURL);
        const url = `${baseURL}/v1/posts`;
        return axiosClient.get(url, {
            headers: {
                'x-auth-token': token.toString(),
            }
        });
    },

    likePost(token, id) {
        const url = `${baseURL}/v1/posts/like/${id}`;
        return axiosClient.put(url, {
            headers: {
                'x-auth-token': token.toString(),
            }
        });
    },
    unlikePost(token, id) {
        const url = `${baseURL}/v1/posts/unlike/${id}`;
        return axiosClient.put(url, {
            headers: {
                'x-auth-token': token.toString(),
            }
        });
    },

    addComment(token, id, comment) {
        const url = `${baseURL}/v1/posts/comment/${id}`;
        return axiosClient.post(url, comment, {
            headers: {
                'x-auth-token': token.toString(),
            }
        });
    },
    getPostById(token, id) {
        const url = `${baseURL}/v1/posts/${id}`;
        return axiosClient.get(url, {
            headers: {
                'x-auth-token': token.toString(),
            }
        });
    },
    addPost(token, post) {
        const url = `${baseURL}/v1/posts`;
        return axiosClient.post(url, post, {
            headers: {
                'x-auth-token': token.toString(),
            }
        });
    },
    getPostsByUser(userId) {
        const url = `${baseURL}/v1/posts/user/${userId}`;
        return axiosClient.get(url);
    },

    updatePost(post) {
        const url = `${baseURL}/v1/posts/${post.id}`;
        return axiosClient.put(url, post);
    },
    deletePost(id) {
        const url = `${baseURL}/v1/posts/${id}`;
        return axiosClient.delete(url);
    },
}

export default postAPI;