// eslint-disable-next-line
'use strict';
import { axiosClient, baseURL } from "./axios-client";

const generalAPI = {
    upload(file) {
        let formData = new FormData();
        formData.append('file', file);
        formData.append('file_name', file.name);
        const url = `${baseURL}/v1/files`;
        return axiosClient.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data; boundary=something'
            }
        });
    },
    getUserByID(id) {
        const url = `${baseURL}/users/${id}`;
        return axiosClient.get(url);
    },
}

export default generalAPI;
