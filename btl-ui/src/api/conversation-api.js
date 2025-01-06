import { axiosClient, baseURL } from "./axios-client";

const conversationAPI = {
    sendMessages(token, id, message){
        const url = `${baseURL}/v1/conversations/${id}`;

        return axiosClient.post(url, message, {
            header:{
                'x-auth-token': token.toString()
            }
        });
    },
    getConversation(token, id){
        const url = `${baseURL}/v1/conversations/conver/${id}`;
        return axiosClient.get(url, {
            header:{
                'x-auth-token': token.toString()
            }
        });
    },
    getConversationByUserId(token, id){
        const url = `${baseURL}/v1/conversations/user/${id}`;
        return axiosClient.get(url, {
            headers :{
                'x-auth-token': token.toString(),
            }
        });
    },
    getConversationBy2UserId(token, uid1, uid2){
        const url = `${baseURL}/v1/conversations/find/${uid1}/${uid2}`;
        return axiosClient.get(url, {
            headers :{
                'x-auth-token': token.toString(),
            }
        })
    },
    createConversation(token, uid1, uid2){
        const url = `${baseURL}/v1/conversations/${uid1}/${uid2}`;
        return axiosClient.post(url, {
            headers :{
                'x-auth-token': token.toString(),
            }
        })
    }
}
export default conversationAPI;