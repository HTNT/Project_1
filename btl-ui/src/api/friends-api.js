import { axiosClient, baseURL } from "./axios-client";

const friendsAPI = {
    getAllRequest(token, id) {
        const url = `${baseURL}/v1/profile/friends/${id}`;
        return axiosClient.get(url, {
            header: {
                "x-auth-token": token.toString(),
            },
        });
    },
    sendRequest(token, id){
        const url = `${baseURL}/v1/profile/friends/${id}`;
        return axiosClient.post(url, {
            header: {
                "x-auth-token": token.toString(),
            },
        });
    },
    acceptRequest(token, id){
        const url = `${baseURL}/v1/profile/friends/${id}`;
        return axiosClient.put(url, {
            header: {
                "x-auth-token": token.toString(),
            },
        });
    },
    getAllFriend(token){
        const url = `${baseURL}/v1/profile/friends`;
        return axiosClient.get(url, {
            header: {
                "x-auth-token": token.toString(),
            },
        });
    }
   
};
export default friendsAPI;