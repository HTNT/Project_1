
/************************************************************************/
// eslint-disable-next-line
'use strict';
import { axiosClient, baseURL } from "./axios-client";

const profileAPI = {
    getMyProfile(token) {
        const url = 'http://localhost:2206/api/v1/profile/me';
        return axiosClient.get(url,{
            headers:{
                'x-auth-token': token.toString(),
            }
        })
    },

    getUser(token, id){
        const url = `http://localhost:2206/api/v1/profile/user/${id}`;
        return axiosClient.get(url,{
            headers:{
                'x-auth-token':token.toString(),
            }
        })

    },

    editMyProfile(user) {
        const url = `${baseURL}/v1/user/update-profile`;
        return axiosClient.put(url, user);
    },
    getById(id){
        const url = `${baseURL}/v1/user/get-by-id/${id}`;
        return axiosClient.get(url);
    }
}

export default profileAPI;
