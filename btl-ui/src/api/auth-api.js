// eslint-disable-next-line
"use strict";
import { axiosClient, baseURL } from "./axios-client";

const authAPI = {
    login(user) {
        const url = `${baseURL}/auth`;
        // console.log(baseURL);
        return axiosClient.post(url, user);
    },
    register(user) {
        const url = `${baseURL}/users/register`;
        // console.log(url);
        return axiosClient.post(url, user);
    },
    getCurrentLogin(data) {
        // console.log(data);
        const url = `${baseURL}/auth`;
        // console.log(url);
        return axiosClient.get(url, {
            headers: {
                "x-auth-token": data,
            },
        });
    },
};

export default authAPI;
