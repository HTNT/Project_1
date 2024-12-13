// eslint-disable-next-line
"use strict";
import axios from "axios";
import Config from "../config";
// const axios = require('axios');

const baseURL = process.env.REACT_APP_API_URL;
const platform = process.env.REACT_APP_PLATFORM || "WEB";
const version = process.env.REACT_APP_VERSION || "1.0.0";
// const application = process.env.REACT_APP_CODE || 'BAITAPLON';
// const tokenName = `${platform}_${application}_ACCESS_TOKEN`;
const tokenName = "TOKEN_BTL";
const userName = "BTL_USER";

const delToken = () => {
    localStorage.removeItem(tokenName);
    localStorage.removeItem("BTL_USER");
};
const setToken = (token) => {
    // Add time expired 1 day to token string
    if (!token) {
        delToken();
        return null;
    }

    const expired = new Date().getTime() + 24 * 60 * 60 * 1000;
    localStorage.setItem(tokenName, `${token}:${expired}`);
};
const getToken = () => {
    let lsToken = JSON.parse(localStorage.getItem(tokenName));
    // console.log(lsToken);

    // Check token validate
    if (!lsToken || lsToken === "") {
        return null;
    }
    const token = lsToken.token;

    return token;
};

const getUser = () => {
    let user = localStorage.getItem(userName);
    // console.log(user);
    return JSON.parse(user);
};

const axiosClient = axios.create({
    headers: {
        "Content-Type": "application/json",
        "X-Access-OS": platform,
        // 'x-auth-token': getToken().toString(),
        "X-Access-Version": version,
    },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
    function (req) {
        const token = getToken();
        if (token) req.headers["x-auth-token"] = token;
        return req;
    },
    function (error) {
        return Promise.reject(error);
    }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
    function (response) {
        if (response && response.data) {
            const status = response.status || null;
            let data = null;
            let code = null;
            if (response.data && response.data.data) {
                data = response.data.data;
            } else if (response.data) {
                data = response.data;
            }
            if (response.data && response.data.code) {
                code = response.data.code;
            } else if (response.code) {
                code = response.code;
            }

            return { status, data, code };
        }
    },
    function (error) {
        let code = null;

        if (error.response && error.response.data && error.response.data.code) {
            code = error.response.data.code;
        } else if (error.response && error.response.code) {
            code = error.response.code;
        } else if (error.code) {
            code = error.code;
        }
        if (code === "ERROR_AUTH_102" || code === "ERROR_AUTH_101") {
            localStorage.removeItem("BTL_USER");
            localStorage.removeItem(Config.tokenName);
            window.location.replace("/login");
        }
        return Promise.reject(error);
    }
);

export {
    baseURL,
    axiosClient,
    getToken,
    setToken,
    delToken,
    tokenName,
    getUser,
};
